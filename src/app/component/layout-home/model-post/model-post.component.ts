import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CreatePostModel } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/services/users/post.service';
import { LoadingController } from '@ionic/angular';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-model-post',
  templateUrl: './model-post.component.html',
  styleUrls: ['./model-post.component.scss']
})
export class ModelPostComponent implements OnInit {
  maxProfilPictureBytesUserFriendlyValue = 5;
  image;
  libelle = "";
  postForm: CreatePostModel;
  user;
  blob;
  constructor(public modalController: ModalController,

    public toastController: ToastController,
    public _postService: PostService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.user = (JSON.parse(localStorage.getItem("user"))).user;

  }

  // dismiss() {

  //   this.modalController.dismiss({
  //     'dismissed': true,

  //   });
  // }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,

    });
    toast.present();
  }


  fileChangeEvent(event: any) {

    if (event !== undefined) {
      if (event.target.files[0].size > 5242880) { // 5MB
        this.presentToast(`vous ne devez pas depasser ${this.maxProfilPictureBytesUserFriendlyValue}`);

        return;
      }

      var reader = new FileReader();
      this.image = event.target.files[0];
      this.blob= event.target.files[0]
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.image = reader.result;
        console.log(event.target.files[0])

      }


    }


  }


  posterBtn() {

    this.postForm = {

      libelle: this.libelle,
      picture: this.blob,
      userId: this.user.id,
    }

    console.log(this.postForm)
    this. presentLoading();
    this._postService.poster(this.postForm).subscribe(res => {

      this.loadingController.dismiss().then((res) => {
        console.log('Loader hidden', res);
    }).catch((error) => {
        console.log(error);
    });
      this.presentToast("Pibliction est terminé");
      this.modalController.dismiss(true);

    },(error)=>{
      this.loadingController.dismiss().then((res) => {
        console.log('Loader hidden', res);
    }).catch((error) => {
        console.log(error);
    });
      this.presentToast(error.error.title);
      console.log(error.error.title);


    })


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


  close(){

this.modalController.dismiss(false)

  }
}
