import { Component, OnInit } from '@angular/core';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';

import { Camera } from '@ionic-native/camera/ngx';
import { UserModel } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users/users.service';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModelPostComponent } from '../model-post/model-post.component';
  @Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.scss']
})
export class ProfilsComponent implements OnInit {

  image = "../../../../assets/image/test.jpg"
  user: any;

  constructor(public actionSheetController: ActionSheetController,
    private plt: Platform, private camera: Camera,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public _usersService: UsersService) {
  }

  ngOnInit() {

    this.user = (JSON.parse(localStorage.getItem("user"))).user;

    if(JSON.parse(localStorage.getItem("profil"))!==null)
     {

      this.image =JSON.parse(localStorage.getItem("profil"))

     }
//   if(this.user.urlPicture!==null && JSON.parse(localStorage.getItem("profil"))===null)
//   {
// this._usersService.getPicture(this.user.urlPicture).subscribe(res=>{

//   if (res ) {

//     this.image = 'data:image/jpeg;base64,' + res;
//     localStorage.setItem('profil', JSON.stringify(this.image))
// }
// console.log(res)

// })


//   }

  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();


    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
       targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA,


    }).then((res) => {

      this.image = 'data:image/jpeg;base64,' + res
      this.presentToast("test2");
      const blob: any = this.base64ToImage(this.image);
      this.blobToFile(blob, 'ProfilePicture' + this.user.fullName)
      blob.name =this.user.fullName+ ".jpg";
      blob.lastModified = new Date();
      this. presentLoading();
      this._usersService.UpdatePicture(blob, this.user.id).subscribe(res => {
        localStorage.setItem('profil', JSON.stringify(this.image))
        this.loadingController.dismiss().then((res) => {
          console.log('Loader hidden', res);
      }).catch((error) => {
          console.log(error);
      });
        this.presentToast("ProfilePicture is go");
      })


    }).catch(e => {
      this.loadingController.dismiss().then((res) => {
        console.log('Loader hidden', res);
    }).catch((error) => {
        console.log(error);
    });
      this.presentToast(e);
    })

  }

  choisirP(): void {

    this.camera.getPicture({
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
       targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,

    }).then((res) => {
      this.image = 'data:image/jpeg;base64,' + res
      this.presentToast("test1");
      const blob: any = this.base64ToImage(this.image);
      this.blobToFile(blob, 'ProfilePicture' + this.user.fullName)
      blob.name =this.user.fullName+ ".jpg";
      blob.lastModified = new Date();
      this. presentLoading();

      this._usersService.UpdatePicture(blob, this.user.id).subscribe(res => {
        localStorage.setItem('profil', JSON.stringify(this.image))
        this.loadingController.dismiss().then((res) => {
          console.log('Loader hidden', res);
      }).catch((error) => {
          console.log(error);
      });
        this.presentToast("ProfilePicture is go");
      })

    }).catch(e => {
      this.loadingController.dismiss().then((res) => {
        console.log('Loader hidden', res);
    }).catch((error) => {
        console.log(error);
    });
      this.presentToast(e);
    })

  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
  }

  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([arrayBuffer], { type: 'image/png' });

    return blob;
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }



  async presentModal() {
    const modal = await this.modalController.create({
      component: ModelPostComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


}
