import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() id: any;
  @Input() service: any;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

  closePopover() {
    this.popoverController.dismiss(false);
  }



  delete()
  {

    this.service.remove(this.id).subscribe(res => {


      console.log("is deleted")
      this.popoverController.dismiss(true);



    }, (error) => {

      console.log(error)





    })

  }

}
