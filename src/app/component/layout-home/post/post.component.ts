import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/users/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this.laodPost()

  }

  laodPost() {

    this._postService.getAll().subscribe(res => {


      console.log(res);
    })

  }

}
