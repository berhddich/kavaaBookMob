import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResultDto, DefaultBaseModel } from '../../models/base-model';
import { CreateReactsModel, EditReactsModel } from '../../models/reacts';

@Injectable({
  providedIn: 'root'
})
export class ReactsService {
  baseUrl = `${environment.apiBaseUrl}api/Posts`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(public _httpClient: HttpClient) { }

  create(input: CreateReactsModel): Observable<any> {
    return this._httpClient.post<ApiResultDto>(this.baseUrl + '/React', JSON.stringify(input), this.httpOptions)
        .pipe(map(response => response), retry(1));
}


Update(input: EditReactsModel): Observable<any> {
  console.log(input)
  return this._httpClient.put<ApiResultDto>(this.baseUrl + '/Update', JSON.stringify(input), this.httpOptions)
      .pipe(map(response => response), retry(1));
}


remove(id: number): Observable<any> {
  const options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
      body: {
          id: id
      },
  };


  return this._httpClient.delete(`${this.baseUrl}/DeleteReact`)
      .pipe(map(response => response), retry(1));
}



}
