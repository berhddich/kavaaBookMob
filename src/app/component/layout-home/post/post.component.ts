import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/users/post.service';
import { GestureController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ModelPostComponent } from '../model-post/model-post.component';
import { ReactionsPageComponent } from '../ReactionsPage/ReactionsPage.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  user: any;
  image = "../../../../assets/image/test.jpg"
  listOfPost: any[];
  laoding=false;
  emojiList=["Like","Love","Care","Haha","Wow","Sad","Angry"]
  constructor(private _postService: PostService,
     public modalController: ModalController,
     public toastController: ToastController,
     private gestureCtrl: GestureController ,
     private popoverController: PopoverController) {    this.laodPost()
  }

  ngOnInit() {
    this.user = (JSON.parse(localStorage.getItem("user")));
    if(JSON.parse(localStorage.getItem("profil"))!==null)
    {

     this.image =JSON.parse(localStorage.getItem("profil"))

    }


  }

  laodPost() {
this.laoding=true;
    this._postService.getAll().subscribe(res => {

this.listOfPost=res;
for(let i=0;i<this.listOfPost.length;i++)
{
  if(this.listOfPost[i].picture!==null)
  {
    this.listOfPost[i].picture='data:image/jpeg;base64,'+this.listOfPost[i].picture;

  }

  if(this.listOfPost[i].pictureUser!==null)
  {

    this.listOfPost[i].pictureUser='data:image/jpeg;base64,'+this.listOfPost[i].pictureUser;


  }


}
this.laoding=false;

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
      if(isValid)
      {
this.laodPost();

      }

  });


    return await modal.present();
  }

  refresh(event)
  {

    this._postService.getAll().subscribe(res => {

      this.listOfPost=res;
      for(let i=0;i<this.listOfPost.length;i++)
      {
        if(this.listOfPost[i].picture!==null)
        {
          this.listOfPost[i].picture='data:image/jpeg;base64,'+this.listOfPost[i].picture;

        }

        if(this.listOfPost[i].pictureUser!==null)
        {

          this.listOfPost[i].pictureUser='data:image/jpeg;base64,'+this.listOfPost[i].pictureUser;


        }


      }
      event.target.complete();

            console.log(this.listOfPost);
          })

  }

  like(){
    console.log("like");
}


showReactions(evant)
{
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


itemPressed()
{
  this.presentToast("ok");

}

async presentToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 4000
  });
  toast.present();
}


}
