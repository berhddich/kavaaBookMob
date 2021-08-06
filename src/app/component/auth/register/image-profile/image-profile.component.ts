import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-profile',
  templateUrl: './image-profile.component.html',
  styleUrls: ['./image-profile.component.scss']
})
export class ImageProfileComponent implements OnInit {
  form: FormGroup;
  urlPicture = '';
  constructor() { }

  ngOnInit() {
  }

  save()
  {
console.log(this.urlPicture);

  }

}
