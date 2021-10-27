import { Component, Input, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { EditPostModel } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/services/users/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  maxProfilPictureBytesUserFriendlyValue = 5;


  postForm: EditPostModel;
  user;
  blob;
  isClik=true;
  @Input() data: any;
  libelle = "";
  image;

  constructor( public modalController: ModalController,

    public toastController: ToastController,
    public _postService: PostService,
    public loadingController: LoadingController,
    public platform: Platform,
    private camera: Camera,) {

      this.user = (JSON.parse(localStorage.getItem("KavaBook_UserSession")));
console.log(this.data)
     }

  ngOnInit() {

    this.libelle=this.data.content;
    this.image=this.data.urlsImg;
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,

    });
    toast.present();
  }


  fileChangeEvent(event: any) {
    console.log(this.platform.is('android'))
    if (this.platform.is('android')) {
      this.choisirP();


    }
    else {

      if (event !== undefined) {
        if (event.target.files[0].size > 5242880) { // 5MB
          this.presentToast(`vous ne devez pas depasser ${this.maxProfilPictureBytesUserFriendlyValue}`);

          return;
        }

        var reader = new FileReader();
        this.blob = event.target.files[0]
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.image = reader.result;
          console.log(event.target.files[0])

        }


      }
    }




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

      this.blob = this.base64ToImage(this.image);
      this.blobToFile(this.blob, 'PostPicture' + this.user.fullName +new Date().getTime() )
      this.blob.name = 'PostPicture'+this.user.fullName +new Date().getTime()+ ".jpg";
      this.blob.lastModified = new Date();





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
  posterBtn() {

    this.postForm = {

      content: this.libelle,
      // urlsImg: this.blob,
      imageUrl:this.data.urlsImg,
      Id:this.data.id
    }
    this.isClik=false;

    console.log(this.postForm)
    this._postService.editPost(this.postForm).subscribe(res => {
      this.isClik=true;

          this.presentToast("Pibliction est terminé");
      this.modalController.dismiss(true);

    }, (error) => {
      this.isClik=true;

      this.presentToast(error);
      console.log(error);


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


  close() {

    this.modalController.dismiss(false)

  }

}
