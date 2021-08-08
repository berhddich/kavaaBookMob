import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { LoadingController } from '@ionic/angular';

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
    public loadingController: LoadingController
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();


    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  save(): void {



   this. presentLoading();

     this._authService.login(this.loginForm.value)

     .subscribe(res=> {
       console.log(res['user'].urlPicture)
      localStorage.setItem('user', JSON.stringify(res))

      if(res['user'].urlPicture!==null)
      {
    this._usersService.getPicture(res['user'].urlPicture).subscribe(res=>{

      if (res ) {

        this.loadingController.dismiss().then((res) => {
          console.log('Loader hidden', res);
      }).catch((error) => {
          console.log(error);
      });
        localStorage.setItem('profil', JSON.stringify('data:image/jpeg;base64,' + res))
        this.presentToast('Login completed');
        this.NavController.navigateRoot('app/tabs-layout')
    }

    },(error)=>{

      this.loadingController.dismiss().then((res) => {
        console.log('Loader hidden', res);
    }).catch((error) => {
        console.log(error);
    });
      this.presentToast(error.error.title);
      console.log(error.error.title);


    })


      }


     }, (error) => {
      this.loadingController.dismiss().then((res) => {
        console.log('Loader hidden', res);
    }).catch((error) => {
        console.log(error);
    });
      this.presentToast(error.error.title);
         console.log(error.error.title);
     });




  }


}
