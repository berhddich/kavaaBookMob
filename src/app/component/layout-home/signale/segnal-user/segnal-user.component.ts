import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateUsersignalModel } from 'src/app/core/models/user-signal';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { UserSignalService } from 'src/app/core/services/user-signal/user-signal.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-segnal-user',
  templateUrl: './segnal-user.component.html',
  styleUrls: ['./segnal-user.component.scss']
})
export class SegnalUserComponent implements OnInit {
  commenterSignaler;
  userSignalModel:CreateUsersignalModel
  @Input() id: number;
  constructor(public modalController: ModalController,
    public _loadingService: LoadingService,
    private _userService:UsersService
    ) { }

  ngOnInit() {
  }


  close( ) {
    this.modalController.dismiss(false)
  }


  sgnalerBtn() {


    this.userSignalModel = {

      commenterSignaler:this.commenterSignaler,
      membreSignaledId:this.id,
    };

    this._userService.signalMember(this.userSignalModel).subscribe(res => {


      console.log("user signal is pass")

      this.close();



    }, (error) => {

      console.log(error)

this.close();

    })



  }


}
