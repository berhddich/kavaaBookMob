import { AfterContentInit, Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, GestureController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { error } from 'protractor';
import { CreateCommentsModel } from 'src/app/core/models/comments';
import { CommentsService } from 'src/app/core/services/comments/comments.service';
import { CommentSignalComponent } from '../signale/commentSignal/commentSignal/commentSignal.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() postId: number;
  @Input() data: any[];
  comment;
  commentNumber = 0;

  commentsModel: CreateCommentsModel;

  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    private _commentsService: CommentsService,
    public actionSheetController: ActionSheetController,
    private gestureCtrl: GestureController,
    public toastController: ToastController,


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



    this._commentsService.create(this.commentsModel).subscribe(res => {
      this.comment = null;

      this.commentNumber++;
      this.data.unshift({
        comment: res.comment,
        createdDate: res.createdDate,
        id: res.id,
        postId: res.postId,
        userId: res.userId,
        userUrlPicture: JSON.parse(localStorage.getItem("profil")),
        userfullName: JSON.parse(localStorage.getItem("KavaBook_UserSession")).fullName



      })



    }, (error) => {

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





  async CommentSignale(id: number, UserName: string) {
    let actionSheet =
      await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [



          {
            text: 'Signaler un problème',
            icon: 'reader',
            handler: () => {

              this.CommmentSignalModal(id, UserName)
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

  async CommmentSignalModal(commmentId: number, UserName: string) {
    const modal = await this.modalController.create({
      component: CommentSignalComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,
      componentProps: {
        'commmentId': commmentId,
        'UserName': UserName
      }

    });

    modal.onDidDismiss()
      .then((data) => {
        const isValid = data['data'];
        if (isValid) {
          this.presentToast('Le signal de Comment a été enregistré ');

        }

      });

    return await modal.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

}
