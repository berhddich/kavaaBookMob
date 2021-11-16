import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/users/post.service';
import { ActionSheetController, GestureController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ModelPostComponent } from '../model-post/model-post.component';
import { ReactionsPageComponent } from '../ReactionsPage/ReactionsPage.component';
import { ReactsService } from 'src/app/core/services/Reacts/reacts.service';
import { CreateReactsModel, EditReactsModel } from 'src/app/core/models/reacts';
import { CommentsComponent } from '../comments/Comments.component';
import { CommentsService } from 'src/app/core/services/comments/comments.service';
import { NavController } from '@ionic/angular';
import { UserProfilsComponent } from '../user-profils/user-profils.component';
import { UsersService } from 'src/app/core/services/users/users.service';
import { PostSignalComponent } from '../signale/post-signal/post-signal.component';
import { PagedRequestDto } from 'src/app/core/models/PagedRequestDto';
import { PostEditComponent } from '../post-edit/post-edit.component';


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
  state:PagedRequestDto;
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


      this.listOfPost = res.data;
      console.log(res);
      for (let i = 0; i < this.listOfPost.length; i++) {
        if (this.listOfPost[i].imgPost !== null) {
          this.listOfPost[i].imgPost = 'data:image/jpeg;base64,' + this.listOfPost[i].imgPost;

        }

        if (this.listOfPost[i].membreImg !== null) {

          this.listOfPost[i].membreImg = 'data:image/jpeg;base64,' + this.listOfPost[i].membreImg;


        }


      }
      this.laoding = false;


    })

  }



  async presentModal() {
    const modal = await this.modalController.create({
      component: ModelPostComponent,
      cssClass: 'my-custom-class',
      animated:true,
      swipeToClose:true,
    });
    modal.onDidDismiss()
    .then((data) => {
      const isValid = data['data'];

      if (isValid) {

        this.laodPost()

      }

    });

    return await modal.present();
  }

  refresh(event) {

    this._postService.getAll().subscribe(res => {
      console.log(res);
      this.listOfPost = res.data;
      for (let i = 0; i < this.listOfPost.length; i++) {
        if (this.listOfPost[i].imgPost !== null) {
          this.listOfPost[i].imgPost = 'data:image/jpeg;base64,' + this.listOfPost[i].imgPost;

        }

        if (this.listOfPost[i].membreImg !== null) {

          this.listOfPost[i].membreImg = 'data:image/jpeg;base64,' + this.listOfPost[i].membreImg;


        }


      }
      event.target.complete();


    })

  }

  public like(postId: number, userUserName: number, typeReact: number,deletId ?:number): void {
    this.reacte = {
      postId: postId,
      typeReact: typeReact

    }
    this.btnLike = true;

    if (this.listOfPost.find(element => element.id === postId).myReact) {
      if (this.listOfPost.find(element => element.id === postId).typeMyReact=== typeReact ) {

                // DELET
                this.listOfPost.find(element => element.id === postId).typeMyReact=0;
                this.listOfPost.find(element => element.id === postId).myReact=false;
                this.listOfPost.find(element => element.id === postId).nomberReact = this.listOfPost.find(element => element.id === postId).nomberReact-1;


        this._reactsService.remove(postId).subscribe(res => {


          console.log("is deleted")


          this.btnLike = false;


        }, (error) => {

          console.log(error)

          this.btnLike = false;

          this.listOfPost.find(element => element.id === postId).typeMyReact=typeReact;
          this.listOfPost.find(element => element.id === postId).myReact=true;
          this.listOfPost.find(element => element.id === postId).nomberReact=this.listOfPost.find(element => element.id === postId).nomberReact+1;



        })








      }



      else {
        // EDIT
        if (deletId===0   )
        {

      // DELET
      this.listOfPost.find(element => element.id === postId).typeMyReact=0;
      this.listOfPost.find(element => element.id === postId).myReact=false;
      this.listOfPost.find(element => element.id === postId).nomberReact = this.listOfPost.find(element => element.id === postId).nomberReact-1;


this._reactsService.remove(postId).subscribe(res => {


console.log("is deleted")


this.btnLike = false;


}, (error) => {

console.log(error)

this.btnLike = false;

this.listOfPost.find(element => element.id === postId).typeMyReact=typeReact;
this.listOfPost.find(element => element.id === postId).myReact=true;
this.listOfPost.find(element => element.id === postId).nomberReact=this.listOfPost.find(element => element.id === postId).nomberReact+1;



})



        }

        else{

          const oldReact=this.listOfPost.find(element => element.id === postId).typeMyReact;
          this.listOfPost.find(element => element.id === postId).myReact = true;
          this.listOfPost.find(element => element.id === postId).typeMyReact=typeReact;


          this._reactsService.Update(this.reacte).subscribe(res => {
            this.btnLike = false;


            console.log("is Edited:")

          }, (error) => {
            this.btnLike = false;

            console.log(error)
            this.listOfPost.find(element => element.id === postId).myReact=true;
            this.listOfPost.find(element => element.id === postId).typeMyReact=oldReact;


          })

        }





      }


    }
    else {


      //CREATE

      this.listOfPost.find(element => element.id === postId).myReact = true;
      this.listOfPost.find(element => element.id === postId).typeMyReact=typeReact;
      this.listOfPost.find(element => element.id === postId).nomberReact=  this.listOfPost.find(element => element.id === postId).nomberReact+1;


      this._reactsService.create(this.reacte).subscribe(res => {
        this.btnLike = false;


        console.log("is create:")

      }, (error) => {
        this.btnLike = false;

        console.log(error)
        this.listOfPost.find(element => element.id === postId).myReact=false;
        this.listOfPost.find(element => element.id === postId).typeMyReact=0;
        this.listOfPost.find(element => element.id === postId).nomberReact=  this.listOfPost.find(element => element.id === postId).nomberReact-1;


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

        this.like(postId, this.user.userName, data['data'])

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
    if ( this.listOfPost[index].typeMyReact === type) {

      return true
    }

    return false



  }


  async parametrePost(postId: number,userUserName: string ,membreId: number) {

    let actionSheet =
      await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [



          {
            text: 'Signaler un problème',
            icon: 'reader',
            handler: () => {
              this.PostSignalModal(postId, membreId)
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
                let post=this.listOfPost.find(element=>element.id === postId);
                console.log(post)
             this.editPost(post)
              }
            },


            {
              text: 'Déplacer dans la corbeille',
              role: 'destructive',
              icon: 'trash',
              handler: () => {
                this.deletPost(postId)              }
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

  async PostSignalModal(postId: number, membreId: number) {
    const modal = await this.modalController.create({
      component: PostSignalComponent,
      cssClass: 'my-custom-class',
      animated: true,
      swipeToClose: true,
      componentProps: {
        'postId': postId,
        'membreSignalId': membreId
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
console.log(data)
        if (data) {
           this.listOfPost.find(element => element.id === postId).nomberComment = this.listOfPost.find(element => element.id === postId).nomberComment + data.data;

        }

      });

    return await modal.present();



  }

  getCommentBypost(postId: number) {
    this.btnComment = true;
    this.postIdForbtn=postId;

this.state={

  PageSize:0,
  pageNumber:0,
  postId:postId
}
    this._commentsService.GetAllCommentsByPostId(this.state).subscribe(res => {

      console.log(res)

      for (let i = 0; i < res.length; i++) {
        if (res[i].membreUrlImg !== null) {
          res[i].membreUrlImg = 'data:image/jpeg;base64,' + res[i].membreUrlImg;

        }

      }


      this.ShowComments(postId, res)
      this.btnComment = false;


    }, (error) => {


      this.btnComment = false;
      this.presentToast(error);
    })



  }

  userProfils(userUserName: string,img :any,membreId:number) {

    if (this.user.userName === userUserName) {
      this.NavController.navigateRoot('app/tabs-layout/profils')


    }
    else {

      this.getUser(membreId,img);


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


  getUser(membreId: number,img:any) {

    this._usersService.getUserByMembreId(membreId).subscribe(res => {
console.log(res)
      res.data.urlPicture=img;

this.userProfilsModel(res.data)

    }, (error) => {

      console.log(error);

    })



  }

  findimogi(postId: number, type:number)
  {

    if(this.listOfPost.find(element => element.id === postId).myReact)
    {

      let typeReact = this.listOfPost.find(element => element.id === postId).typeMyReact


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


  deletPost(postId :number)
  {

    this._postService.removePost(postId).subscribe(res => {


      console.log("is deleted",res)
this.laodPost();

    }, (error) => {

      console.log(error)

    })

  }

  async editPost(post :any ) {
    const modal = await this.modalController.create({
      component: PostEditComponent,
      cssClass: 'my-custom-class',
      animated:true,
      swipeToClose:true,
      componentProps: {
        'data': post,


      }
    });
    modal.onDidDismiss()
    .then((data) => {
      const isValid = data['data'];
      console.log(data);

      if (isValid) {

        this.laodPost()

      }

    });

    return await modal.present();


  }


}
