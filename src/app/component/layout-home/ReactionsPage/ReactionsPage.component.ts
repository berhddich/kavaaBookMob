import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-ReactionsPage',
  templateUrl: './ReactionsPage.component.html',
  styleUrls: ['./ReactionsPage.component.scss']
})
export class ReactionsPageComponent implements OnInit {

  constructor(  private popoverController: PopoverController) { }

  ngOnInit() {
  }

  type(id:number)
  {


    this.popoverController.dismiss(id)
  }

}
