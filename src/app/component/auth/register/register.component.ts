import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { NavController } from '@ionic/angular';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { UserSessionService } from 'src/app/core/services/user-session/user-session.service';
import { AccountService } from 'src/app/core/services/Account/account.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { LoginModel, RegesterModel } from 'src/app/core/models/user';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  tabsNumber = 1;
  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
    public NavController: NavController,
    public toastController: ToastController,
    private _authService: AuthService,
    private _usersService: UsersService,
    private _jkwtService: JwtService,
    private _accountService: AccountService,
    private _loadingService: LoadingService,

    private _userSessionService: UserSessionService) { }

  ngOnInit() {

    this.registerForm = this.fb.group({
      fullName: [, Validators.required],
      birthDate: [, Validators.required],
      email: [, Validators.required],
      userName: [, Validators.required],
      password: [, Validators.required],

      // isactive: true
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
    let resf: RegesterModel = {
          password: this.registerForm.controls['password'].value,
            email: this.registerForm.controls['email'].value,
            birthDate:this.registerForm.controls['birthDate'].value,
            fullName:this.registerForm.controls['fullName'].value,
            userName:this.registerForm.controls['userName'].value,
           }
    this._authService.register(resf)
      .subscribe(res => {
        console.log(res)
  //       let loginForm: LoginModel = {
  //         Password: this.registerForm.controls['password'].value,
  //         Email: this.registerForm.controls['email'].value,
  //       }
  //       this._authService.login(loginForm).subscribe(log=>{

  //  this._jkwtService.saveToken(log.data)

  //       this._accountService.GetCurrentLoginInformations().subscribe(user => {
  //         this._userSessionService.save(user.data)

  //         this._loadingService.dismiss();
  //         this.presentToast('Register completed');
  //         this.NavController.navigateRoot('app/tabs-layout')

  //       })

  //       },(error)=>{

  //         this._loadingService.dismiss();

  //         this.presentToast(error);
  //         console.log(error);

  //       })
      }, (error) => {
        this._loadingService.dismiss();

        this.presentToast(error);
        console.log(error);
      });

  }


  test() {
    if (this.tabsNumber === 1) {
      this.tabsNumber = 2
    }

    if (this.tabsNumber === 2) {
      this.tabsNumber = 3
    }
    if (this.tabsNumber === 3) {
      this.tabsNumber = 1
    }
  }


}
