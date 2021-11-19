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
  styleUrls: ['./login.component.scss'],
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
    private _userSessionService: UserSessionService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [, Validators.required],
      password: [, Validators.required],
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
    });
    toast.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
  async save(): Promise<void> {
    // this._loadingService.presentLoading();
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    this._authService.login(this.loginForm.value).subscribe(
      async (res) => {
        await loading.present();
        this._jkwtService.saveToken(res.data);
        this._accountService.GetCurrentLoginInformations().subscribe((user) => {

          this._userSessionService.save(user);
          if (user.urlPicture !== null) {
            this._usersService.getPicture(user.urlPicture).subscribe(
              (res) => {
                this._loadingService.dismiss();

                if (res) {
                  localStorage.setItem(
                    'ImageProfil',
                    JSON.stringify('data:image/jpeg;base64,' + res)
                  );
                  this.presentToast('Login completed');
                  this.NavController.navigateRoot('app/tabs-layout');
                }
              },
              (error) => {
                this._loadingService.dismiss();
                this.presentToast(error.error.title);
                console.log(error.error.title);
              }
            );
          } else {
            this.presentToast('Login completed');
            this.NavController.navigateRoot('app/tabs-layout');
            this._loadingService.dismiss();
          }
        });
      },
      async (error) => {
        await loading.onDidDismiss();
        this._loadingService.dismiss();
        this.presentToast(error);
        console.log(error);
      }
    );
  }
}
