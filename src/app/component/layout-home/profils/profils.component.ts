import { Component, OnInit } from '@angular/core';
import { ActionSheetController, Platform, PopoverController, ToastController } from '@ionic/angular';

import { Camera } from '@ionic-native/camera/ngx';
import { UserModel } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users/users.service';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModelPostComponent } from '../model-post/model-post.component';
import { PostService } from 'src/app/core/services/users/post.service';
import { CreateReactsModel, EditReactsModel } from 'src/app/core/models/reacts';
import { CommentsService } from 'src/app/core/services/comments/comments.service';
import { CommentsComponent } from '../comments/Comments.component';
import { ReactsService } from 'src/app/core/services/Reacts/reacts.service';
import { ReactionsPageComponent } from '../ReactionsPage/ReactionsPage.component';
import { PostSignalComponent } from '../signale/post-signal/post-signal.component';
import { PagedRequestDto } from 'src/app/core/models/PagedRequestDto';
  @Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.scss']
})
export class ProfilsComponent implements OnInit {

  image = "../../../../assets/image/test.jpg"
  user: any;
  listOfPost: any[];
  laoding=false;
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
  racteForEdit:EditReactsModel;
  btnComment=false;
  btnreact=false;
  longPres=0;
  dt;
  state:PagedRequestDto;

  constructor(public actionSheetController: ActionSheetController,
    private _commentsService:CommentsService ,
    private plt: Platform, private camera: Camera,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private _reactsService: ReactsService,
    private _postService: PostService,
    private popoverController: PopoverController,
    public _usersService: UsersService)
     {
      this.user = (JSON.parse(localStorage.getItem("KavaBook_UserSession")));
      this.laodPost()
  }



  ngOnInit() {



    if(JSON.parse(localStorage.getItem("ImageProfil"))!==null)
     {

      this.image =JSON.parse(localStorage.getItem("ImageProfil"))

     }


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

  async ChangeProfilePhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Changement photo profile',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera-outline',
          handler: () => {
            console.log("CAMERA")
            this.PrendreP();

            ;
          }
        }

        ,
        {
          text: 'Import photo ',
          icon: 'images-outline',
          handler: () => {
            console.log("Library")
            this.choisirP();
          }
        },
        {
          text: 'Supprimer',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        }
        , {
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



  PrendreP(): void {

    this.camera.getPicture({
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
       targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA,


    }).then((res) => {

      this.image = 'data:image/jpeg;base64,' + res
      this.presentToast("test2");
      const blob: any = this.base64ToImage(this.image);
      this.blobToFile(blob, 'ProfilePicture' + this.user.fullName)
      blob.name =this.user.fullName+ ".jpg";
      blob.lastModified = new Date();
      this. presentLoading();
      this._usersService.UpdatePicture(blob).subscribe(res => {
        localStorage.setItem('profil', JSON.stringify(this.image))
        this.loadingController.dismiss().then((res) => {
          console.log('Loader hidden', res);
      }).catch((error) => {
          console.log(error);
      });
        this.presentToast("ProfilePicture is go");
      })


    }).catch(e => {
      this.loadingController.dismiss().then((res) => {
        console.log('Loader hidden', res);
    }).catch((error) => {
        console.log(error);
    });
      this.presentToast(e);
    })

  }

  choisirP(): void {

    this.camera.getPicture({
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
       targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,

    }).then((res) => {
      this.image = 'data:image/jpeg;base64,' + res
      this.presentToast("test1");
      const blob: any = this.base64ToImage(this.image);
      this.blobToFile(blob, 'ProfilePicture' + this.user.fullName)
      blob.name =this.user.fullName+ ".jpg";
      blob.lastModified = new Date();
      this. presentLoading();

      this._usersService.UpdatePicture(blob).subscribe(res => {
        localStorage.setItem('profil', JSON.stringify(this.image))
        this.loadingController.dismiss().then((res) => {
          console.log('Loader hidden', res);
      }).catch((error) => {
          console.log(error);
      });
        this.presentToast("ProfilePicture is go");
      })

    }).catch(e => {
      this.loadingController.dismiss().then((res) => {
        console.log('Loader hidden', res);
    }).catch((error) => {
        console.log(error);
    });
      this.presentToast(e);
    })

  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
  }



  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([arrayBuffer], { type: 'image/png' });

    return blob;
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }



  async presentModal() {
    const modal = await this.modalController.create({
      component: ModelPostComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }



  laodPost() {
    this.laoding=true;
        this._postService.getAllByUserId().subscribe(res => {

    this.listOfPost=res;
    for(let i=0;i<this.listOfPost.length;i++)
    {
      if(this.listOfPost[i].imgPost!==null)
      {
        this.listOfPost[i].imgPost='data:image/jpeg;base64,'+this.listOfPost[i].imgPost;

      }

      if(this.listOfPost[i].membreImg!==null)
      {

        this.listOfPost[i].membreImg='data:image/jpeg;base64,'+this.listOfPost[i].membreImg;


      }


    }
    this.laoding=false;

          console.log(this.listOfPost);
        })

      }



      async parametrePost(postId:number,userId:number)
      {

        let actionSheet =
         await this.actionSheetController.create({
          cssClass: 'my-custom-class',
          buttons: [



          {
            text: 'Signaler un problème',
            icon: 'reader',
            handler: () => {
             this.PostSignalModal(postId,userId)
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
        if(userId===this.user.id)
        {

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

      async PostSignalModal(postId:number,userId:number) {
        const modal = await this.modalController.create({
          component: PostSignalComponent,
          cssClass: 'my-custom-class',
          animated:true,
          swipeToClose:true,
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
            this.presentToast('Le signal de publication a été enregistré ');

          }

        });

        return await modal.present();
      }



      findReact(index: number, type: number) {
        if ( this.listOfPost[index].typeMyReact === type) {

          return true
        }

        return false



      }


      getCommentBypost(postId: number)
      {
        this.btnComment=true;

        this.state={

          PageSize:0,
          pageNumber:0,
          postId:postId
        }
        this._commentsService.GetAllCommentsByPostId( this.state).subscribe(res=>{


          for (let i = 0; i < res.length; i++) {
            if (res[i].userUrlPicture !== null) {
              res[i].userUrlPicture= 'data:image/jpeg;base64,' + res[i].userUrlPicture;

            }

          }

          console.log(res)
          this.ShowComments(postId,res)
          this.btnComment=false;


        },(error)=>{


          this.btnComment=false;
          this.presentToast(error);
        })



      }





  async ShowComments(postId:number,data:any)
  {
    const modal = await this.modalController.create({
      component: CommentsComponent,
      cssClass: 'my-custom-class',
      animated:true,
      swipeToClose:true,
      componentProps: {
        'postId': postId,
        'userId': this.user.id,
        'data':data

      }

    });

    modal.onDidDismiss()
    .then((data) => {
      const isValid = data['data'];
      console.log(data);

      if (isValid) {
this.listOfPost.find(element => element.id === postId).numberComments=this.listOfPost.find(element => element.id === postId).numberComments + isValid;

      }

    });

    return await modal.present();



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

        if (deletId===0   ) {
          let id = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName ).id;
          let react = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userUserName === this.user.userName ).typeReact;

          this.listOfPost.find(element => element.id === postId).typeReact.forEach((value, index) => {
            if (value.userUserName === this.user.userName) this.listOfPost.find(element => element.id === postId).typeReact.splice(index, 1);
          });

          this._reactsService.remove(id).subscribe(res => {


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



  async presentPopover(ev: any,postId:number) {
    this.btnreact=true;
    this.longPres++;

if(this.longPres===1)
{

   const popover = await this.popoverController.create({
      component: ReactionsPageComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
    await popover.onDidDismiss().then((data:any)=>{
      console.log(data['data'])
    this.btnreact=false;
    this.longPres=0;

      this.like(postId,this.user.id,data['data'])

    }


    )

}

  }


  refresh(event) {

    this._postService. getAllByUserId().subscribe(res => {

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


}
