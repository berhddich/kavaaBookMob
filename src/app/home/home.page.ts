import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image="../../../../assets/image/test.jpg"

  constructor(private camera: Camera,public toastController: ToastController,public actionSheetController: ActionSheetController) {}


  async ChangeProfilePhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Changement photo profile',
      cssClass: 'my-custom-class',
      buttons: [
       {
        text: 'Camera',
        icon: 'camera-outline',
        handler: () => {
          console.log("CAMERA")
          this.PrendreP();

 ;       }
      }

      ,
      {
        text: 'Import photo ',
        icon: 'images-outline',
        handler: () => {
          console.log("Library")
          this.choisirP();
        }
      },
      {
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }
      ,{
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



  PrendreP(): void {

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType:this.camera.DestinationType.FILE_URI

    }).then((res) => {

      this.image ='data:image/jpeg;base64,' + res
      const files: File[] = [new File([this.image], 'ProfilePicture.png', { type: 'png' })];

      }).catch(e => {
        this.presentToast(e);    })

  }

  choisirP(): void {

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.camera.DestinationType.DATA_URL


    }).then((res) => {
      this.image ='data:image/jpeg;base64,' + res
      const files: File[] = [new File([this.image], 'ProfilePicture.png', { type: 'png' })];

      const randomId=Math.random().toString(36).substring(2,8)
     }).catch(e => {
      this.presentToast(e);    })

  }



  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

}
