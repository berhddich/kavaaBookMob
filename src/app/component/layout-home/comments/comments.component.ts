import { AfterContentInit, Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, GestureController, LoadingController, ModalController } from '@ionic/angular';
import { error } from 'protractor';
import { CreateCommentsModel } from 'src/app/core/models/comments';
import { CommentsService } from 'src/app/core/services/comments/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent   implements OnInit {
  @Input() postId: number;
  @Input() data: any[];
  comment;
  commentNumber=0;

  commentsModel: CreateCommentsModel;

  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    private _commentsService: CommentsService ,
    public actionSheetController: ActionSheetController,
    private gestureCtrl: GestureController,


  ) {

  }

  public ngOnInit() {


  }

  close() {
    this.modalController.dismiss(this.commentNumber)
  }


  CommentBtn() {

    this.commentsModel = {
      comment: this.comment,
      postId: this.postId,


    }



    this._commentsService.create(this.commentsModel).subscribe(res=>{
this.comment=null;

this.commentNumber++;
      this.data.unshift({
        comment:res.comment,
        createdDate:res.createdDate,
        id:res.id,
        postId:res.postId,
        userId:res.userId,
        userUrlPicture: JSON.parse(localStorage.getItem("profil")),
        userfullName: JSON.parse(localStorage.getItem("KavaBook_UserSession")).fullName



      })



    },(error)=>{

      console.log(error)

    })


  }


  logScrollEnd(event) {
    console.log("logScrollEnd : When Scroll Ends", event);
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



  parametreCom() {
    console.log("test")



  }

  async CommentSignale() {
    let actionSheet =
    await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [



        {
          text: 'Signaler un problème',
          icon: 'reader',
          handler: () => {


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


}
