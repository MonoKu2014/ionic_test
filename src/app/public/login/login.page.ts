import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string;
  public password: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private storage: Storage,
    private spinnerDialog: SpinnerDialog
  ) { }

  ngOnInit() {
    // saltar login en dev
    if (this.storage.get(TOKEN_KEY)) {
      this.router.navigate(['home']);
    }
  }

  login() {
    // this.spinnerDialog.show('title', 'message', false);
    this.authService.login(this.email, this.password).then(response => {
        if (response.access_token) {
          this.storage.set(TOKEN_KEY, response.access_token).then(() => {
            this.authService.authenticationState.next(true);
          });
          this.authService.authenticationState.subscribe(state => {
            // this.spinnerDialog.hide();
            if (state) {
              this.router.navigate(['home']);
            } else {
              this.router.navigate(['login']);
            }
          });
        } else {
          // this.spinnerDialog.hide();
          this.router.navigate(['login']);
        }
    });
  }

}
