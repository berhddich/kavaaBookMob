import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResultDto } from '../../models/base-model';
import { CreateCommentsModel } from '../../models/comments';
import { CreatePostignalModel } from '../../models/post-signals';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  baseUrl = `${environment.apiBaseUrl}api/Comments`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(public _httpClient: HttpClient) { }

  GetAllCommentsByPostId(PostId:number): Observable<any> {
    return this._httpClient.get<ApiResultDto>(`${this.baseUrl}/getAllCommentsByPostId?PostId=`+PostId, this.httpOptions)
      .pipe(map(response => response), retry(1));
  }


  create(input: CreateCommentsModel  ): Observable<any> {
    return this._httpClient.post<ApiResultDto>(this.baseUrl + '/Create', JSON.stringify(input), this.httpOptions)
        .pipe(map(response => response), retry(1));
}

}
