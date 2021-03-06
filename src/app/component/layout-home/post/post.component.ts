import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/users/post.service';
import { ActionSheetController, GestureController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ModelPostComponent } from '../model-post/model-post.component';
import { ReactionsPageComponent } from '../ReactionsPage/ReactionsPage.component';
import { element } from 'protractor';
import { ReactsService } from 'src/app/core/services/Reacts/reacts.service';
import { CreateReactsModel, EditReactsModel } from 'src/app/core/models/reacts';
import { error } from 'console';
import { ParametrePostComponent } from './parametre-post/parametre-post.component';
import { CommentsComponent } from '../comments/Comments.component';
import { CommentsService } from 'src/app/core/services/comments/comments.service';
import { NavController } from '@ionic/angular';
import { UserProfilsComponent } from '../user-profils/user-profils.component';
import { UsersService } from 'src/app/core/services/users/users.service';
import { PostSignalComponent } from '../signale/post-signal/post-signal.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  user: any;
  image = "../../../../assets/image/test.jpg"
  listOfPost: any[];
  laoding = false;
  emojiList = [
    { type: false, id: 1 },
    { type: false, id: 2 },
    { type: false, id: 3 },
    { type: false, id: 4 },
    { type: false, id: 5 },
    { type: false, id: 6 },
    { type: false, id: 7 }];
  reacte: CreateReactsModel;
  btnLike = false;
  racteForEdit: EditReactsModel;
  btnComment = false;
  btnreact = false;
  longPres = 0;
  postIdForbtn;
  constructor(private _postService: PostService,
    public modalController: ModalController,
    public toastController: ToastController,
    private gestureCtrl: GestureController,
    private _reactsService: ReactsService,
    private popoverController: PopoverController,
    public actionSheetController: ActionSheetController,
    public NavController: NavController,
    private _usersService: UsersService,

    private _commentsService: CommentsService) {
    this.laodPost()
    this.user = (JSON.parse(localStorage.getItem("user")));

  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem("profil")) !== null) {

      this.image = JSON.parse(localStorage.getItem("profil"))

    }


  }

  laodPost() {
    this.laoding = true;
    this._postService.getAll().subscribe(res => {


      this.listOfPost = res;
      for (let i = 0; i < this.listOfPost.length; i++) {
        if (this.listOfPost[i].picture !== null) {
          this.listOfPost[i].picture = 'data:image/jpeg;base64,' + this.listOfPost[i].picture;

        }

        if (this.listOfPost[i].pictureUser !== null) {

          this.listOfPost[i].pictureUser = 'data:image/jpeg;base64,' + this.listOfPost[i].pictureUser;


        }


      }
      this.laoding = false;

      console.log(this.listOfPost);
    })

  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModelPostComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,

    });

    modal.onDidDismiss()
      .then((data) => {
        const isValid = data['data'];
        if (isValid) {
          this.laodPost();

        }

      });


    return await modal.present();
  }

  refresh(event) {

    this._postService.getAll().subscribe(res => {

      this.listOfPost = res;
      for (let i = 0; i < this.listOfPost.length; i++) {
        if (this.listOfPost[i].picture !== null) {
          this.listOfPost[i].picture = 'data:image/jpeg;base64,' + this.listOfPost[i].picture;

        }

        if (this.listOfPost[i].pictureUser !== null) {

          this.listOfPost[i].pictureUser = 'data:image/jpeg;base64,' + this.listOfPost[i].pictureUser;


        }


      }
      event.target.complete();

      console.log(this.listOfPost);
    })

  }

  public like(postId: number, userId: number, typeReact: number): void {
    this.reacte = {
      postId: postId,
      userId: this.user.id,
      typeReact: typeReact

    }

    this.btnLike = true;

    if (this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id)) {
      if (this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id && element.typeReact === typeReact)) {

        console.log(this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id && element.typeReact === typeReact))

        let id = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id && element.typeReact === typeReact).id;


        // DELET
        if (id !== undefined) {

          this.listOfPost.find(element => element.id === postId).typeReact.forEach((value, index) => {
            if (value.userId === this.user.id && value.typeReact === typeReact) this.listOfPost.find(element => element.id === postId).typeReact.splice(index, 1);
          });

          this._reactsService.delete(id).subscribe(res => {


            console.log("is deleted")
            this.btnLike = false;

          }, (error) => {

            console.log(error)
            const reactDeleted = {
              postId: postId,
              userId: this.user.id,
              typeReact: typeReact,
              id: id

            }
            this.btnLike = false;

            this.listOfPost.find(element => element.id === postId).typeReact.push(reactDeleted);



          })
        }

        else {
          this.listOfPost.find(element => element.id === postId).typeReact.forEach((value, index) => {
            if (value.userId === this.user.id && value.typeReact === typeReact) this.listOfPost.find(element => element.id === postId).typeReact.splice(index, 1);
          });
          this.btnLike = false;



        }







      }

      else {
        const oldReact = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id).typeReact
        this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id).typeReact = typeReact;
        const react = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id);
        this.racteForEdit = {

          postId: postId,
          userId: this.user.id,
          typeReact: typeReact,
          id: react.id


        }
        this._reactsService.Update(this.racteForEdit).subscribe(res => {

          console.log("is Edit");

          this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id).typeReact = typeReact;
          this.btnLike = false;


        }, (error) => {

          console.log(error);
          this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id).typeReact = oldReact;
          this.btnLike = false;




        })



        // EDIT


      }


    }
    else {


      //CREATE

      this.listOfPost.find(element => element.id === postId).typeReact.push(this.reacte);
      this._reactsService.create(this.reacte).subscribe(res => {
        this.btnLike = false;


        console.log("is create:")
        console.log(res)
        this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id && element.typeReact === typeReact).id = res.id
        this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id && element.typeReact === typeReact).createdDate = res.createdDate


      }, (error) => {
        this.btnLike = false;

        console.log(error)
        this.listOfPost.find(element => element.id === postId).typeReact.forEach((value, index) => {
          if (value.userId === this.reacte.userId && value.typeReact === this.reacte.typeReact) this.listOfPost.find(element => element.id === postId).typeReact.splice(index, 1);
        });
      })



    }
  }


  showReactions(evant) {
    console.log(evant)


  }


  async presentPopover(ev: any, postId: number) {
    this.btnreact = true;
    this.longPres++;

    if (this.longPres === 1) {

      const popover = await this.popoverController.create({
        component: ReactionsPageComponent,
        cssClass: 'rection',
        event: ev,
        translucent: true
      });
      await popover.present();
      await popover.onDidDismiss().then((data: any) => {
        console.log(data['data'])
        this.btnreact = false;
        this.longPres = 0;

        this.like(postId, this.user.id, data['data'])

      }


      )

    }

  }




  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }


  findReact(index: number, type: number) {
    if (this.listOfPost[index].typeReact.find(element => element.typeReact === type)) {

      return true
    }

    return false



  }


  async parametrePost(postId: number, userId: number) {

    let actionSheet =
      await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [



          {
            text: 'Signaler un probl??me',
            icon: 'reader',
            handler: () => {
              this.PostSignalModal(postId, userId)
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
    if (userId === this.user.id) {

      actionSheet =
        await this.actionSheetController.create({
          cssClass: 'my-custom-class',
          buttons: [

            {
              text: 'Modifier la publication',
              icon: 'create-outline',
              handler: () => {
                console.log('Play clicked');
              }
            },


            {
              text: 'D??placer dans la corbeille',
              role: 'destructive',
              icon: 'trash',
              handler: () => {
                console.log('Delete clicked');
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

    }
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

  async PostSignalModal(postId: number, userId: number) {
    const modal = await this.modalController.create({
      component: PostSignalComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,
      componentProps: {
        'postId': postId,
        'userId': userId,
        'userSignalId': this.user.id
      }

    });

    modal.onDidDismiss()
      .then((data) => {
        const isValid = data['data'];
        if (isValid) {
          this.presentToast('Le signal de publication a ??t?? enregistr?? ');

        }

      });

    return await modal.present();
  }


  async ShowComments(postId: number, data: any) {
    const modal = await this.modalController.create({
      component: CommentsComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,
      componentProps: {
        'postId': postId,
        'userId': this.user.id,
        'data': data

      }

    });

    modal.onDidDismiss()
      .then((data) => {
        const isValid = data['data'];
        console.log(data);

        if (isValid) {
          this.listOfPost.find(element => element.id === postId).numberComments = this.listOfPost.find(element => element.id === postId).numberComments + isValid;

        }

      });

    return await modal.present();



  }

  getCommentBypost(postId: number) {
    this.btnComment = true;
    this.postIdForbtn=postId;


    this._commentsService.GetAllCommentsByPostId(postId).subscribe(res => {


      for (let i = 0; i < res.length; i++) {
        if (res[i].userUrlPicture !== null) {
          res[i].userUrlPicture = 'data:image/jpeg;base64,' + res[i].userUrlPicture;

        }

      }

      console.log(res)
      this.ShowComments(postId, res)
      this.btnComment = false;


    }, (error) => {


      this.btnComment = false;
      this.presentToast(error);
    })



  }

  userProfils(userId: number,img :any) {

    if (this.user.id === userId) {
      this.NavController.navigateRoot('app/tabs-layout/profils')


    }
    else {

      this.getUser(userId,img);


    }




  }

  async userProfilsModel( data :any) {
    const modal = await this.modalController.create({
      component: UserProfilsComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,
      componentProps: {


         'data':data

      }

    });

    modal.onDidDismiss()
      .then((data) => {
        const isValid = data['data'];


        if (isValid) {

        }

      });

    return await modal.present();



  }


  getUser(userId: number,img:any) {


    this._usersService.get(userId).subscribe(res => {
      console.log(res)
      res.urlPicture=img;

this.userProfilsModel(res)

    }, (error) => {

      console.log(error);

    })



  }



}
