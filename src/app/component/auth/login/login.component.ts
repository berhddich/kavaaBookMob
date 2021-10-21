import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { AccountService } from 'src/app/core/services/Account/account.service';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { UserSessionService } from 'src/app/core/services/user-session/user-session.service';

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
    private _loadingService: LoadingService,
    private _accountService: AccountService,
    private _jkwtService: JwtService,
    private _userSessionService: UserSessionService
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

      .subscribe(res => {


        console.log(res)
        this._jkwtService.saveToken(res.data)

        this._accountService.GetCurrentLoginInformations().subscribe(user => {
          console.log(user)
          this._userSessionService.save(user)


     if(user.urlPicture!==null)
          {

        this._usersService.getPicture(user.urlPicture).subscribe(res=>{
          this._loadingService.dismiss();

          if (res ) {



            localStorage.setItem('ImageProfil', JSON.stringify('data:image/jpeg;base64,' + res))
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


        })





      }, (error) => {
        this._loadingService.dismiss();

        this.presentToast(error);
        console.log(error);
      }
      );




  }


}
