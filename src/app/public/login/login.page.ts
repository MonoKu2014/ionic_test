import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string;
  public password: string;
  public loading: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private storage: Storage,
    public loadingControl: LoadingController
  ) { }

  ngOnInit() {
    this.loadingControl.create({
      message: 'Ingresando...'
    }).then((res) => {
      this.loading = res;
    });
  }

  login() {
    this.loading.present();
    this.authService.login(this.email, this.password).then(response => {
        if (response.access_token) {
          this.storage.set(TOKEN_KEY, response.access_token).then(() => {
            this.authService.authenticationState.next(true);
          });
          this.authService.authenticationState.subscribe(state => {
            if (state) {
              this.loading.dismiss();
              this.router.navigate(['home']);
            } else {
              this.loading.dismiss();
              this.router.navigate(['login']);
            }
          });
        } else {
          this.loading.dismiss();
          this.router.navigate(['login']);
        }
    });
  }

}
