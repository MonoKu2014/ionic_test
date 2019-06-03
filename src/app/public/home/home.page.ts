import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public goldServices: any;

  constructor() {
    this.goldServices = [];
  }

  ngOnInit() {
    this.goldServices = [
      {
        enterprise: 'Bluemonkey',
        sector: 'Desarrollo web',
        description: 'Desarrollamos todo tipo de sotwares a medida para automatizar los procesos de tu empresa, ven y solicita tu hora'
      },
      {
        enterprise: 'Bluemonkey',
        sector: 'Desarrollo web',
        description: 'Desarrollamos todo tipo de sotwares a medida para automatizar los procesos de tu empresa, ven y solicita tu hora'
      },
      {
        enterprise: 'Bluemonkey',
        sector: 'Desarrollo web',
        description: 'Desarrollamos todo tipo de sotwares a medida para automatizar los procesos de tu empresa, ven y solicita tu hora'
      },
    ];
  }

}
