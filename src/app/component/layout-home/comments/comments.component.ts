import { AfterContentInit, Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, GestureController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { element, error } from 'protractor';
import { CreateCommentsModel } from 'src/app/core/models/comments';
import { CommentsService } from 'src/app/core/services/comments/comments.service';
import { SignalrService } from 'src/app/core/services/signalr/signalr.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { DeleteComponent } from '../delete/delete.component';
import { CommentSignalComponent } from '../signale/commentSignal/commentSignal/commentSignal.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';

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
    private _signalrService: SignalrService,
    public _usersService: UsersService,
    public popoverController: PopoverController,

  ) {

  }

  public ngOnInit() {
    // this.commentRepons();


  }

  close() {
    this.modalController.dismiss(this.commentNumber)
  }

  commentRepons() {
    this._signalrService.hubConnecttion.on("commentRepons", (comment) => {

      if (comment.userUrlPicture !== null && comment.userUrlPicture !== undefined) {

        let user = this.data.find(element => element.userName === comment.userName)


        if (user !== null || user !== null) {

          comment.userUrlPicture = user.userUrlPicture;




        }

        else {




          this._usersService.getPicture(comment.userUrlPicture).subscribe(res => {


            if (res) {
              comment.userUrlPicture = 'data:image/jpeg;base64,' + res
            }
          }, (error) => {

            console.log(error.error.title);

          })

        }

      }
      this.data.unshift(comment)



    })
  }

  CommentBtn() {
    const user = (JSON.parse(localStorage.getItem("KavaBook_UserSession")));

    this.commentsModel = {
      comment: this.comment,
      postId: this.postId,


    }



    this._commentsService.create(this.commentsModel).subscribe(res => {
      this.comment = null;
      this.commentNumber++;

      const comments = {
        comment: res.data.comment,
        createdOn: res.data.createdOn,
        id: res.data.id,
        postId: res.data.postId,
        membreId: res.data.membreId,
        membreFullName: user.fullName,
        membreUrlImg: res.data.membreUrlImg,
        membreUserName: user.userName,

      };

      this.data.unshift({
        comment: res.data.comment,
        createdOn: res.data.createdOn,
        id: res.data.id,
        postId: res.data.postId,
        membreId: res.data.membreId,
        membreFullName: user.fullName,
        membreUrlImg: JSON.parse(localStorage.getItem("ImageProfil")),
        membreUserName: user.userName,

      })
      console.log(res, this.data)

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


  async CommentSignale(id: number, membreId: number, membreUserName: string) {
    let userName = (JSON.parse(localStorage.getItem("KavaBook_UserSession"))).userName;


    if (userName === membreUserName) {
      let actionSheet =
        await this.actionSheetController.create({
          cssClass: 'my-custom-class',
          buttons: [

            {
              text: 'Modifier la publication',
              icon: 'create-outline',
              handler: () => {

                const data = this.data.find(element => element.id === id);
                this.editComment(id, data)
              }
            },



            {
              text: 'Déplacer dans la corbeille',
              role: 'destructive',
              icon: 'trash',
              handler: () => {

                this.deletComment(id);
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

    else {

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


  async deletComment(id: number) {
    console.log(id)
    const modal = await this.popoverController.create({
      component: DeleteComponent,
      cssClass: 'popover-delet',
      animated: true,
      componentProps: {
        'id': id,
        'service': this._commentsService
      }

    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.commentNumber = this.commentNumber - 1;
          this.data.forEach((element, index) => {
            if (element.id == id) this.data.splice(index, 1);
          });
          this.presentToast('Le  Comment a été Supprimer ');


        }

      });

    return await modal.present();
  }


  async editComment(id: number, data: any) {
    const modal = await this.popoverController.create({
      component: EditCommentComponent,
      cssClass: 'popover-edit',
      animated: true,
      componentProps: {
        'id': id,
        'data': data,
        'service': this._commentsService
      }

    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.data.find(element => element.id === id).comment = data.data;
          this.presentToast('Le  Comment a été Edit ');


        }

      });

    return await modal.present();
  }



}
