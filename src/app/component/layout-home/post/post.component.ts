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
    this.user = (JSON.parse(localStorage.getItem("KavaBook_UserSession")));

  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem("ImageProfil")) !== null) {

      this.image = JSON.parse(localStorage.getItem("ImageProfil"))

    }


  }

  laodPost() {
    this.laoding = true;
    this._postService.getAll().subscribe(res => {


      this.listOfPost = res;
      console.log(this.listOfPost);
      // for (let i = 0; i < this.listOfPost.length; i++) {
      //   if (this.listOfPost[i].picture !== null) {
      //     this.listOfPost[i].picture = 'data:image/jpeg;base64,' + this.listOfPost[i].picture;

      //   }

      //   if (this.listOfPost[i].pictureUser !== null) {

      //     this.listOfPost[i].pictureUser = 'data:image/jpeg;base64,' + this.listOfPost[i].pictureUser;


      //   }


      // }
      this.laoding = false;


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

  public like(postId: number, userUserName: number, typeReact: number,deletId ?:number): void {
    this.reacte = {
      postId: postId,
      userUserName: this.user.userName,
      typeReact: typeReact

    }
    this.btnLike = true;

    if (this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName)) {
      if (this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName && element.typeReact === typeReact) ) {


        let id = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName && element.typeReact === typeReact).id;


        // DELET
        if (id !== undefined) {
console.log("eeeee")
          this.listOfPost.find(element => element.id === postId).typeReact.forEach((value, index) => {
            if (value.userUserName === this.user.userName && value.typeReact === typeReact) this.listOfPost.find(element => element.id === postId).typeReact.splice(index, 1);
          });

          this._reactsService.delete(id).subscribe(res => {


            console.log("is deleted")
            this.btnLike = false;

          }, (error) => {

            console.log(error)
            const reactDeleted = {
              postId: postId,
              userUserName: this.user.userName,
              typeReact: typeReact,
              id: id

            }
            this.btnLike = false;

            this.listOfPost.find(element => element.id === postId).typeReact.push(reactDeleted);



          })
        }

        else {
          this.listOfPost.find(element => element.id === postId).typeReact.forEach((value, index) => {
            if (value.userName === this.user.userName && value.typeReact === typeReact) this.listOfPost.find(element => element.id === postId).typeReact.splice(index, 1);
          });
          this.btnLike = false;



        }







      }



      else {

        if (deletId===0   ) {
          console.log("dddd")
          let id = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName ).id;
          let react = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName ).typeReact;

          this.listOfPost.find(element => element.id === postId).typeReact.forEach((value, index) => {
            if (value.userUserName === this.user.userName) this.listOfPost.find(element => element.id === postId).typeReact.splice(index, 1);
          });

          this._reactsService.delete(id).subscribe(res => {


            console.log("is deleted")
            this.btnLike = false;

          }, (error) => {

            console.log(error)
            const reactDeleted = {
              postId: postId,
              userUserName: this.user.userName,
              typeReact: react,
              id: id

            }
            this.btnLike = false;

            this.listOfPost.find(element => element.id === postId).typeReact.push(reactDeleted);



          })
        }


        else{

          const oldReact = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName).typeReact
        this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName).typeReact = typeReact;
        const react = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName);
        this.racteForEdit = {

          postId: postId,
          userUserName: this.user.userName,
          typeReact: typeReact,
          id: react.id


        }
        this._reactsService.Update(this.racteForEdit).subscribe(res => {

          console.log("is Edit");

          this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName).typeReact = typeReact;
          this.btnLike = false;


        }, (error) => {

          console.log(error);
          this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName).typeReact = oldReact;
          this.btnLike = false;




        })


        }


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
        this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName && element.typeReact === typeReact).id = res.id
        this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName && element.typeReact === typeReact).createdOn = res.createdOn


      }, (error) => {
        this.btnLike = false;

        console.log(error)
        this.listOfPost.find(element => element.id === postId).typeReact.forEach((value, index) => {
          if (value.userUserName === this.reacte.userUserName && value.typeReact === this.reacte.typeReact) this.listOfPost.find(element => element.id === postId).typeReact.splice(index, 1);
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


  async parametrePost(postId: number, userUserName: string) {

    let actionSheet =
      await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [



          {
            text: 'Signaler un problème',
            icon: 'reader',
            handler: () => {
              this.PostSignalModal(postId, userUserName)
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
    if (userUserName === this.user.userName) {

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
              text: 'Déplacer dans la corbeille',
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

  async PostSignalModal(postId: number, userUserName: string) {
    const modal = await this.modalController.create({
      component: PostSignalComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,
      componentProps: {
        'postId': postId,
        'userSignalUserName': userUserName
      }

    });

    modal.onDidDismiss()
      .then((data) => {
        const isValid = data['data'];
        if (isValid) {
          this.presentToast('Le signal de publication a été enregistré ');

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

  userProfils(userUserName: string,img :any) {

    if (this.user.userName === userUserName) {
      this.NavController.navigateRoot('app/tabs-layout/profils')


    }
    else {

      this.getUser(userUserName,img);


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


  getUser(userUserName: string,img:any) {


    this._usersService.getUserByuserName(userUserName).subscribe(res => {
      console.log(res.data)
      res.urlPicture=img;

this.userProfilsModel(res.data)

    }, (error) => {

      console.log(error);

    })



  }

  findimogi(postId: number, type:number)
  {

    if(this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName ))
    {

      let typeReact = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName ).typeReact


      if(typeReact==type)
      {
    return true

      }
      else  {
        return false
      }

    }




    else{
      if(type===0)
      {
       return  true
      }

      else
      {
        return false

      }

    }

  }



}
