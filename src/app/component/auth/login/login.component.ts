import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public toastController: ToastController,
    private _authService: AuthService,
    public NavController: NavController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [, Validators.required],
      password: [, Validators.required],


    });

  }
  user= { fullName :"Abdererahim ber",
  birthDate:Date.now(),
  email:'test',
  urlPicture:'string',
  password :'test',


  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  save(): void {

    // if(this.loginForm.controls['email'].value==='test' && this.loginForm.controls['password'].value==='test')
    // {
    //   localStorage.setItem('user', JSON.stringify(this.loginForm.value))
    //   this.presentToast('Login completed');

    //   this.NavController.navigateRoot('app/tabs-layout')

    // }
    // else{

    //   this.presentToast('information incorect');

    // }



     this._authService.login(this.loginForm.value)

     .subscribe(res=> {

   this.presentToast('Login completed');
      localStorage.setItem('user', JSON.stringify(res))
      this.NavController.navigateRoot('app/tabs-layout')
     }, (error) => {
      this.presentToast(error.error.title);
         console.log(error.error.title);
     });




  }


}