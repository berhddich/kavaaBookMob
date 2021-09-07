import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResultDto } from '../../models/base-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = `${environment.apiBaseUrl}api/Account`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(public _httpClient: HttpClient) { }


  GetCurrentLoginInformations(): Observable<any> {
    return this._httpClient.get<ApiResultDto>(`${this.baseUrl}/GetCurrentLoginInformations`, this.httpOptions)
      .pipe(map(response => response), retry(1));
  }


}
