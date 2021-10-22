import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map, retry, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResultDto } from '../models/base-model';
import { JwtTokenModel } from '../models/JwtTokenModel';
import { LoginModel, RegesterModel } from '../models/user';
import { JwtService } from './jwt/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiBaseUrl}api/Authentication`;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(public _httpClient: HttpClient, public NavController: NavController, private _jwtService:JwtService,

    private router: Router,) {

    {
      /* Saving user data in localstorage when
      logged in and setting up null when logged out */
    }
  }








  login(input: LoginModel): Observable<any> {
    return this._httpClient.post<any>(this.baseUrl +'/GetToken', JSON.stringify(input), this.httpOptions)
    .pipe(map(response => response), retry(1));
}



register(input: RegesterModel): Observable<any> {
console.log(input)
  return this._httpClient.post<any>(this.baseUrl+ '/Register' , JSON.stringify(input), this.httpOptions)
  .pipe(map(response => response), retry(1));
}


  islogin() {

    const currentUserToken = this._jwtService.currentUserTokenValue;

    return !(currentUserToken === null || currentUserToken === undefined);

  }




  logout() {

    localStorage.clear();
    this.NavController.navigateRoot('home')

  }


  refreshLogin(): Observable<any> {

    const currenttoken = this._jwtService.currentUserTokenValue;
    if (currenttoken && currenttoken.refreshToken) {


            const body={
              token:currenttoken.token,
              refreshToken:currenttoken.refreshToken

            }

            return this._httpClient.post<any>(`${this.baseUrl}/refresh`, body, this.httpOptions)
            .pipe( shareReplay());
    }
}



}
