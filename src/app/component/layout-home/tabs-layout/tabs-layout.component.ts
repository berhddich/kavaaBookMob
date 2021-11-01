import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { SettingComponent } from './setting/setting.component';


@Component({
  selector: 'app-tabs-layout',
  templateUrl: './tabs-layout.component.html',
  styleUrls: ['./tabs-layout.component.scss']
})
export class TabsLayoutComponent implements OnInit {

  constructor(private _authService: AuthService, public toastController: ToastController,
      public NavController: NavController ,
      public modalController:ModalController,

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



      async setting() {
        const modal = await this.modalController.create({
          component: SettingComponent,
          animated: true,
          swipeToClose: true,


        });

        modal.onDidDismiss()
          .then((data) => {
            const isValid = data['data'];
            if (isValid) {

            }

          });

        return await modal.present();
      }


      Voisettings()
      {

        this.setting();
      }


      async presentToast(msg) {
        const toast = await this.toastController.create({
          message: msg,
          duration: 4000,

        });
        toast.present();
      }

}
