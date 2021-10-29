import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { EditCommentsModel } from 'src/app/core/models/comments';
import { CommentsService } from 'src/app/core/services/comments/comments.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  comment;
  @Input() data: any;
  tabe:EditCommentsModel;


  constructor(
    private _commentsService:CommentsService,
    public toastController: ToastController,
    public popoverController: PopoverController
    ) { }

  ngOnInit() {
this.comment=this.data.comment;

  }
  edit()
  {
    this.tabe={
     id:this.data.id,
     comment:this.comment
    }
    this._commentsService.editComment(this.tabe).subscribe(res => {
          this.presentToast("Modification  est terminé");
          this.popoverController.dismiss(this.comment);

    }, (error) => {

      this.presentToast(error);
      console.log(error);


    })


  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
