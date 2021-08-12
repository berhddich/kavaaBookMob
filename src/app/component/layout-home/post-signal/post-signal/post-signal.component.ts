import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { error } from 'protractor';
import { CreatePostignalModel } from 'src/app/core/models/post-signals';
import { PostSignalsService } from 'src/app/core/services/post-signals/post-signals.service';

@Component({
  selector: 'app-post-signal',
  templateUrl: './post-signal.component.html',
  styleUrls: ['./post-signal.component.scss']
})
export class PostSignalComponent implements OnInit {
  postignal: CreatePostignalModel;
  reason;

  @Input() postId: number;
  @Input() userId: number;
  @Input() userSignalId: number;
  constructor(public modalController: ModalController,
    private _postSignalsService: PostSignalsService,
    public loadingController: LoadingController

  ) { }

  ngOnInit() {

  }

  close( ) {
    this.modalController.dismiss(false)
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


  sgnalerBtn() {

    this.presentLoading();

    this.postignal = {
      postId: this.postId,
      reason: this.reason,
      userId: this.userId,
      userSignalId: this.userSignalId
    };

    this._postSignalsService.create(this.postignal).subscribe(res => {

      console.log("postignal is pass")
      this.loadingController.dismiss().then((res) => {
        this.modalController.dismiss(true)

    }).catch((error) => {

        console.log(error);
    });



    }, (error) => {

      console.log(error)
      this.loadingController.dismiss().then((res) => {
        console.log('Loader hidden', res);
    }).catch((error) => {

        console.log(error);
    });


    })





  }

}
