import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  user;
  constructor(public modalController: ModalController,
    public toastController: ToastController)
    {
      this.user = (JSON.parse(localStorage.getItem("KavaBook_UserSession")));


     }

  ngOnInit() {

  }


  close() {

    this.modalController.dismiss(false)

  }
  voir()
  {



  }

}
