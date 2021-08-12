import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user;
  constructor(
    private fb: FormBuilder,
    public toastController: ToastController,
    public _usersService: UsersService,
    private _authService: AuthService,
    public NavController: NavController,
    private _loadingService:LoadingService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [, Validators.required],
      password: [, Validators.required],


    });

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }



  save(): void {



   this._loadingService.presentLoading();

     this._authService.login(this.loginForm.value)

     .subscribe(res=> {
       console.log(res['user'].urlPicture)
      localStorage.setItem('user', JSON.stringify(res.user))
      localStorage.setItem('token', JSON.stringify(res.token))

      if(res['user'].urlPicture!==null)
      {

    this._usersService.getPicture(res['user'].urlPicture).subscribe(res=>{
      this._loadingService.dismiss();

      if (res ) {



        localStorage.setItem('profil', JSON.stringify('data:image/jpeg;base64,' + res))
        this.presentToast('Login completed');
        this.NavController.navigateRoot('app/tabs-layout')
    }

    },(error)=>{

      this._loadingService.dismiss();
      this.presentToast(error.error.title);
      console.log(error.error.title);


    })


      }
      else{
        this._loadingService.dismiss();


        this.presentToast('Login completed');
        this.NavController.navigateRoot('app/tabs-layout')
      }


     }, (error) => {
      this._loadingService.dismiss();

      this.presentToast(error.error.title);
         console.log(error.error.title);
     });




  }


}
