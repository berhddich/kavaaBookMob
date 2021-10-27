import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResultDto } from '../../models/base-model';
import { CreatePostModel, EditPostModel } from '../../models/post';
import { CreatePostignalModel } from '../../models/post-signals';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = `${environment.apiBaseUrl}api/Posts`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(public _httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this._httpClient.get<ApiResultDto>(`${this.baseUrl}/GetAll`, this.httpOptions)
      .pipe(map(response => response), retry(1));
  }

  getAllByUserId(): Observable<any> {
    return this._httpClient.get<ApiResultDto>(`${this.baseUrl}/GetAllByMember`, this.httpOptions)
      .pipe(map(response => response), retry(1));
  }


  poster(iput: CreatePostModel): Observable<any> {
    var formData: any = new FormData();

    formData.append("content", iput.content);
    if (iput.urlsImg) {
      formData.append("urlsImg", iput.content);

      // formData.append("picture", iput.picture, iput.picture.name);
    }

    return this._httpClient.post<any>(this.baseUrl + '/Create', formData)
      .pipe(map(response => response), retry(1));
  }


  editPost(iput: EditPostModel): Observable<any> {
    // var formData: any = new FormData();

    // formData.append("content", iput.content);

    // formData.append("id", iput.Id);
    // if (iput.imageUrl) {
    //   formData.append("imageUrl", iput.content);

    //   formData.append("picture", iput.picture, iput.picture.name);
    // }
console.log(iput)

    return this._httpClient.put<any>(this.baseUrl + '/UpdatePost',JSON.stringify(iput),  this.httpOptions)
      .pipe(map(response => response), retry(1));
  }


  signalerPoste(input: CreatePostignalModel): Observable<any> {
    return this._httpClient.post<any>(this.baseUrl+ '/Signal' , JSON.stringify(input), this.httpOptions)
    .pipe(map(response => response), retry(1));

}


removePost(id: number): Observable<any> {
  const options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
      body: {
          id: id
      },
  };
  return this._httpClient.delete(`${this.baseUrl}/`+id)
      .pipe(map(response => response), retry(1));
}


}
