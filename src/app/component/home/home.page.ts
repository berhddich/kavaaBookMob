import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navController: NavController) {}


  register() {
    this.navController.navigateForward('auth/register');
  }

  login() {
    this.navController.navigateForward('auth/login');
  }

}
