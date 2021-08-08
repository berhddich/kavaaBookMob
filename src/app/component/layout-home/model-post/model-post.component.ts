import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-model-post',
  templateUrl: './model-post.component.html',
  styleUrls: ['./model-post.component.scss']
})
export class ModelPostComponent implements OnInit {
  maxProfilPictureBytesUserFriendlyValue = 5;
  image;
  constructor(public modalController: ModalController,

    public toastController: ToastController,
    ) { }

  ngOnInit() {
  }

  dismiss() {

    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }


  fileChangeEvent(event: any) {
    if (event.target.files[0].size > 5242880) { // 5MB
      this.presentToast(`vous ne devez pas depasser ${this.maxProfilPictureBytesUserFriendlyValue}`);

      return;
  }

  var reader = new FileReader();
  this.image = event.target.files[0];
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (_event) => {
    this.image = reader.result;
  console.log(event.target.files[0])

  }}


  posterBtn()
  {



  }

}
