import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/users/post.service';
import { GestureController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ModelPostComponent } from '../model-post/model-post.component';
import { ReactionsPageComponent } from '../ReactionsPage/ReactionsPage.component';
import { element } from 'protractor';
import { ReactsService } from 'src/app/core/services/Reacts/reacts.service';
import { CreateReactsModel, EditReactsModel } from 'src/app/core/models/reacts';
import { error } from 'console';

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
  racteForEdit:EditReactsModel
  constructor(private _postService: PostService,
    public modalController: ModalController,
    public toastController: ToastController,
    private gestureCtrl: GestureController,
    private _reactsService: ReactsService,
    private popoverController: PopoverController) {
    this.laodPost()
  }

  ngOnInit() {
    this.user = (JSON.parse(localStorage.getItem("user")));
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
      cssClass: 'my-custom-class'
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

  like(postId: number, userId: number, typeReact: number) {
    this.reacte = {
      postId: postId,
      userId: this.user.id,
      typeReact: typeReact

    }

    this.btnLike = true;

    if (this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id)) {
      if (this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === this.user.id && element.typeReact === typeReact)) {

        let id = this.listOfPost.find(element => element.id === postId).typeReact.find(element => element.userId === userId && element.typeReact === typeReact).id;



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


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ReactionsPageComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  itemPressed() {
    this.presentToast("ok");

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

}
