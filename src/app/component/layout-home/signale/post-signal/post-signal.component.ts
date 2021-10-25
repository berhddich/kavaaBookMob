import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { error } from 'protractor';
import { CreatePostignalModel } from 'src/app/core/models/post-signals';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { PostSignalsService } from 'src/app/core/services/post-signals/post-signals.service';
import { NavController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PostService } from 'src/app/core/services/users/post.service';


@Component({
  selector: 'app-post-signal',
  templateUrl: './post-signal.component.html',
  styleUrls: ['./post-signal.component.scss']
})
export class PostSignalComponent implements OnInit {
  postignal: CreatePostignalModel;
  reason;

  @Input() postId: number;
  @Input() membreSignalId: number;


  constructor(public modalController: ModalController,
    private _postService:PostService,
    public NavController: NavController,
    private loadingController: LoadingController


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

  dismiss()
  {
  this.loadingController.dismiss();


  }

  sgnalerBtn() {


    this.postignal = {
      postId: this.postId,
      reason: this.reason,
      membreSignalId: this.membreSignalId
    };

    this._postService.signalerPoste(this.postignal).subscribe(res => {

      console.log("postignal is pass",res)
     this.close();



    }, (error) => {

      console.log(error)




    })





  }

}
