import { Component, OnInit } from '@angular/core';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';

import { Camera } from '@ionic-native/camera/ngx';
import { UserModel } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users/users.service';
@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.scss']
})
export class ProfilsComponent implements OnInit {

  image = "../../../../assets/image/test.jpg"
  user: UserModel;

  constructor(public actionSheetController: ActionSheetController,
    private plt: Platform, private camera: Camera,
    public toastController: ToastController,
    public _usersService: UsersService) {
  }

  ngOnInit() {

     this.user=(JSON.parse(localStorage.getItem("user"))).user;
    console.log(this.user)

  }




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

            ;
          }
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
        , {
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
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA,


    }).then((res) => {

      this.image = 'data:image/jpeg;base64,' + res
      const files: File[] = [new File([this.image], 'ProfilePicture'+this.user.fullName, { type: 'png' })];

    }).catch(e => {
      this.presentToast(e);
    })

  }

  choisirP(): void {

    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY

    }).then((res) => {
      this.image = 'data:image/jpeg;base64,' + res
      const files: File = new File([ this.image], 'ProfilePicture', { type: 'png' });
      this._usersService.UpdatePicture(files, this.user.id).subscribe(res => {

        this.presentToast("ProfilePicture is go");
      })

    }).catch(e => {
      this.presentToast(e);
    })

  }



  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }


  fileChangeEvent(event: any): void {
   const file:File= event.target.files[0];
   console.log(file)
   this.presentToast(file);
    this._usersService.UpdatePicture(file, this.user.id).subscribe(res => {

    this.presentToast("ProfilePicture is go");
   })



}

}
