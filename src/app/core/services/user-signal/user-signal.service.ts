import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResultDto } from '../../models/base-model';
import { CreateUsersignalModel } from '../../models/user-signal';

@Injectable({
  providedIn: 'root'
})
export class UserSignalService {
  baseUrl = `${environment.apiBaseUrl}api/UserSignals`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(public _httpClient: HttpClient) { }


  signalMemer(input: CreateUsersignalModel  ): Observable<any> {
    return this._httpClient.post<ApiResultDto>(this.baseUrl + '/Create', JSON.stringify(input), this.httpOptions)
        .pipe(map(response => response), retry(1));
}

}
