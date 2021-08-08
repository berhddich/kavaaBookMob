import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/users/post.service';
import { ModalController } from '@ionic/angular';
import { ModelPostComponent } from '../model-post/model-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  user: any;
  image = "../../../../assets/image/test.jpg"

  constructor(private _postService: PostService, public modalController: ModalController,) { }

  ngOnInit() {
    this.user = (JSON.parse(localStorage.getItem("user"))).user;
    if(JSON.parse(localStorage.getItem("profil"))!==null)
    {

     this.image =JSON.parse(localStorage.getItem("profil"))

    }

    this.laodPost()

  }

  laodPost() {

    this._postService.getAll().subscribe(res => {


      console.log(res);
    })

  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModelPostComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
