import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-tabs-layout',
  templateUrl: './tabs-layout.component.html',
  styleUrls: ['./tabs-layout.component.scss']
})
export class TabsLayoutComponent implements OnInit {

  constructor(private _authService: AuthService, public toastController: ToastController,
      public NavController: NavController ,

    private menu: MenuController) { }

  ngOnInit() {
  }

  ionTabsDidChange(){


  }
  ionTabsWillChange(){


      }

      openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
      }

      openEnd() {
        this.menu.open('end');
      }

      openCustom() {
        this.menu.enable(true, 'custom');
        this.menu.open('custom');
      }

      Logout() {
        this._authService.logout();

      }


      async presentToast(msg) {
        const toast = await this.toastController.create({
          message: msg,
          duration: 1000
        });
        toast.present();
      }


}
