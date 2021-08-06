import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  tabsNumber=1;
  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
    public NavController: NavController,
    public toastController: ToastController,
    private _authService: AuthService, private _usersService: UsersService) { }

  ngOnInit() {

    this.registerForm = this.fb.group({
      fullName: [, Validators.required],
      birthDate: [, Validators.required],
      email: [, Validators.required],
      urlPicture: [],
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

  save(): void
   {
console.log(this.registerForm.value)
    this._usersService
    .create(this.registerForm.value)

    .subscribe(res=> {
      this.presentToast("s'inscrire completed");
      localStorage.setItem('user', JSON.stringify(res))
      this.NavController.navigateRoot('app/tabs-layout')


    }, (error) => {
        console.log(error);
    });

  }
  test()
  {
    if(this.tabsNumber===1)
    {
      this.tabsNumber=2
    }

    if(this.tabsNumber===2)
    {
      this.tabsNumber=3
    }
    if(this.tabsNumber===3)
    {
      this.tabsNumber=1
    }
  }


}
