import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResultDto } from '../../models/base-model';
import { map, retry } from 'rxjs/operators';
import { CreateUserModel } from '../../models/user';
import { CreateUsersignalModel } from '../../models/user-signal';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = `${environment.apiBaseUrl}api/Membre`;

   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(public _httpClient: HttpClient) {

  }


  getAll(): Observable<any[]> {
    return this._httpClient.get<any>(this.baseUrl);
  }




  create(input: CreateUserModel): Observable<CreateUserModel> {

    return this._httpClient.post<any>(this.baseUrl + '/Create', JSON.stringify(input), this.httpOptions)
        .pipe(map(response => response), retry(1));
}



UpdatePicture(file:File): Observable<any> {
  var formData: any = new FormData();

  formData.append("UrlPicture", file,file.name);


  return this._httpClient.post<any>(this.baseUrl + '/UpdatePicture', formData)
      .pipe(map(response => response), retry(1));
}



getPicture(urlPicture:string  ): Observable<any> {
  return this._httpClient.get<any>(this.baseUrl + '/GetPicture?imageUrl='+urlPicture);
}

getUserByMembreId(membreId:number ): Observable<any> {

  return this._httpClient.get<any>(this.baseUrl + '/Get?id='+membreId)
  .pipe(map(response => response), retry(1));




}


signalMember(input: CreateUsersignalModel  ): Observable<any> {
  return this._httpClient.post<ApiResultDto>(this.baseUrl + '/SignalMembre', JSON.stringify(input), this.httpOptions)
      .pipe(map(response => response), retry(1));
}

}
