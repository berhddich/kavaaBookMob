import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CommentsSignalService } from 'src/app/core/services/commentsSignal/commentsSignal.service';

@Component({
  selector: 'app-commentSignal',
  templateUrl: './commentSignal.component.html',
  styleUrls: ['./commentSignal.component.scss']
})
export class CommentSignalComponent implements OnInit {
  reason;
  commentstignal: any;

  @Input() commmentId: number;
  @Input() UserName: string;
  constructor(public modalController: ModalController,
    private loadingController: LoadingController,
    public NavController: NavController,
private _commentsSignalService:CommentsSignalService

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


    this.commentstignal = {
      commentId: this.commmentId,
      reason: this.reason,
      userSignalUserName: this.UserName
    };

    this._commentsSignalService.create(this.commentstignal).subscribe(res => {

      console.log("Comment stignal is pass")
     this.close();



    }, (error) => {

      console.log(error)




    })





  }


}
