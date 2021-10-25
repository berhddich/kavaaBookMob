import { AfterContentInit, Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, GestureController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { element, error } from 'protractor';
import { CreateCommentsModel } from 'src/app/core/models/comments';
import { CommentsService } from 'src/app/core/services/comments/comments.service';
import { SignalrService } from 'src/app/core/services/signalr/signalr.service';
import { UsersService } from 'src/app/core/services/users/users.service';
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
    private _signalrService:SignalrService,
    public _usersService: UsersService,


  ) {

  }

  public ngOnInit() {
// this.commentRepons();


  }

  close() {
    this.modalController.dismiss(this.commentNumber)
  }

  commentRepons()
  {
    this._signalrService.hubConnecttion.on("commentRepons",(comment)=>{

if(comment.userUrlPicture!==null && comment.userUrlPicture!==undefined)
{

  let user=this.data.find(element=>element.userName === comment.userName )


  if(user !== null || user !== null)
  {

    comment.userUrlPicture = user.userUrlPicture;

  }

  else{

    this._usersService.getPicture(comment.userUrlPicture).subscribe(res=>{


      if (res ) {
        comment.userUrlPicture='data:image/jpeg;base64,' + res
    }
    },(error)=>{

      console.log(error.error.title);

    })

  }

}
      this.data.unshift(comment)



      })
  }

  CommentBtn() {
   const   user = (JSON.parse(localStorage.getItem("KavaBook_UserSession")));

    this.commentsModel = {
      comment: this.comment,
      postId: this.postId,


    }



    this._commentsService.create(this.commentsModel).subscribe(res => {
      console.log(res)
      this.comment = null;
      this.commentNumber++;

      const comments={
        comment: res.comment,
        dateCreate: res.dateCreate,
        id: res.id,
        postId: res.postId,
        membreId: res.membreId,
        membreFullName: user.fullName,
        membreUrlImg: res.membreUrlImg,

      };




      this.data.unshift({
        comment: res.comment,
        dateCreate: res.dateCreate,
        id: res.id,
        postId: res.postId,
        membreId: res.membreId,
        membreFullName: user.fullName,
        membreUrlImg: JSON.parse(localStorage.getItem("ImageProfil")),

      })
//  this._signalrService.addComment(comments);

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





  async CommentSignale(id: number,membreId:number, membreUserName: string) {
     let  userName = (JSON.parse(localStorage.getItem("KavaBook_UserSession"))).userName;


    if(userName === membreUserName)

    {
      let actionSheet =
      await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [





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

    else{

      let actionSheet =
      await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [



          {
            text: 'Signaler un problème',
            icon: 'reader',
            handler: () => {

              this.CommmentSignalModal(id, membreId)
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

  async CommmentSignalModal(commmentId: number, membreId: number) {
    const modal = await this.modalController.create({
      component: CommentSignalComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,
      componentProps: {
        'commmentId': commmentId,
        'membreId': membreId
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
