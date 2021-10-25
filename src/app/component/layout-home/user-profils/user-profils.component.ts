import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { ChateComponent } from '../chate/chate.component';
import { SegnalUserComponent } from '../signale/segnal-user/segnal-user.component';

@Component({
  selector: 'app-user-profils',
  templateUrl: './user-profils.component.html',
  styleUrls: ['./user-profils.component.scss']
})
export class UserProfilsComponent implements OnInit {
  @Input() data: any;
  constructor(public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,
    ) { }

  ngOnInit() {
  }

  close() {

    this.modalController.dismiss(false)

  }


  async parametre( id: number) {

    let actionSheet =
      await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'Chate',
            icon: 'chatbubble-ellipses-outline',
            handler: () => {
              this.ChateModal();


            }
          },


          {
            text: 'Signaler un problème',
            icon: 'reader',
            handler: () => {
              this.PostSignalModal(id);


            }
          },

          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
      });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

  async PostSignalModal( id: number) {
    const modal = await this.modalController.create({
      component: SegnalUserComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,
      componentProps: {
        'id': id,

      }

    });

    modal.onDidDismiss()
      .then((data) => {
        const isValid = data['data'];
        if (isValid) {
          this.presentToast('Le signal de publication a été enregistré ');

        }

      });

    return await modal.present();
  }



  async ChateModal( ) {
    const modal = await this.modalController.create({
      component: ChateComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,
      componentProps: {
        // 'userName': userName,

      }

    });

    modal.onDidDismiss()
      .then((data) => {
        const isValid = data['data'];
        if (isValid) {
          this.presentToast('');

        }

      });

    return await modal.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

}
