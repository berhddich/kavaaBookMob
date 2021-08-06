import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared.module';
import { ImageProfileComponent } from './register/image-profile/image-profile.component';
import { InformationConnectionComponent } from './register/information-connection/information-connection.component';
import { InformationPersonnelComponent } from './register/information-personnel/information-personnel.component';

const routes: Route[] = [

  {
      path: 'login',
      component: LoginComponent ,
  },
  {
    path: 'register',
    component:  RegisterComponent
},


];
@NgModule({
  imports: [
    CommonModule,SharedModule ,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginComponent,RegisterComponent,ImageProfileComponent,InformationConnectionComponent,InformationPersonnelComponent]
})
export class AuthModule { }
