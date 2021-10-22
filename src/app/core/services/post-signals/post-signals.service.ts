import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResultDto } from '../../models/base-model';
import { CreatePostignalModel } from '../../models/post-signals';

@Injectable({
  providedIn: 'root'
})
export class PostSignalsService {
  baseUrl = `${environment.apiBaseUrl}api/Posts`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  constructor(public _httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this._httpClient.get<ApiResultDto>(`${this.baseUrl}/GetAll`, this.httpOptions)
      .pipe(map(response => response), retry(1));
  }


  create(input: CreatePostignalModel  ): any {
    return this._httpClient.post<any>(this.baseUrl + '/Signal', JSON.stringify(input), this.httpOptions);
}


}
