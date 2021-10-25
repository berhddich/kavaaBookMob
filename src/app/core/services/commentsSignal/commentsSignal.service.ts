import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResultDto } from '../../models/base-model';

@Injectable({
  providedIn: 'root'
})
export class CommentsSignalService {
  baseUrl = `${environment.apiBaseUrl}api/Comment`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(public _httpClient: HttpClient) { }



  create(input: any  ): Observable<any> {
    return this._httpClient.post<ApiResultDto>(this.baseUrl + '/SignalComment', JSON.stringify(input), this.httpOptions)
        .pipe(map(response => response), retry(1));
}
}
