import { AfterContentInit, Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { error } from 'protractor';
import { CreateCommentsModel } from 'src/app/core/models/comments';
import { CommentsService } from 'src/app/core/services/comments/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent   implements AfterContentInit {
  @Input() postId: number;
  @Input() userId: number;
  @Input() data: any[];
  comment;
  commentNumber=0;

  commentsModel: CreateCommentsModel;

  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    private _commentsService: CommentsService ,


  ) {

  }

  public ngAfterContentInit() {


  }

  close() {
    this.modalController.dismiss(this.commentNumber)
  }


  CommentBtn() {

    this.commentsModel = {
      comment: this.comment,
      postId: this.postId,
      userId: this.userId

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
        userfullName: JSON.parse(localStorage.getItem("user")).fullName



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




}
