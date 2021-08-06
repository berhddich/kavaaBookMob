import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map, retry, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResultDto } from '../models/base-model';
import { LoginModel } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiBaseUrl}api/Aut/authenticate`;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(public _httpClient: HttpClient, public NavController: NavController,

    private router: Router,) {

    {
      /* Saving user data in localstorage when
      logged in and setting up null when logged out */
    }
  }





  // login(email: string, password: string): Observable<any> {
  //   const body = new HttpParams()
  //     .set('email', email)
  //     .set('password', password)
  //   return this._httpClient.post<LoginModel>(this.baseUrl, JSON.stringify(body), this.httpOptions)



  // }


  login(input: LoginModel): Observable<any> {
    return this._httpClient.post<any>(this.baseUrl , JSON.stringify(input), this.httpOptions)
        .pipe(map(response =>   response), retry(1));
}


  islogin() {

    let user = JSON.parse(localStorage.getItem('user')) as boolean;

    if (user) {
      return true;
    }
    else {
      return false;
    }

  }
  // currentUser() {

  //   let user = JSON.parse(localStorage.getItem('user'));

  //   if (user) { return user.emailVerified }


  //   return false

  // }

  logout() {

    localStorage.clear();
    this.NavController.navigateRoot('home')




  }



}
