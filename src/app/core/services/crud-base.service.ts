import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { retry, map, tap } from 'rxjs/operators';
import { IModel, PagedResultDto, ApiResultDto } from '../models/base-model';
import { environment } from 'src/environments/environment';
import { PagedRequestDto } from '../models/PagedRequestDto';

/**
 * CrudService de base
 */
export abstract class CrudBaseService<
    TModel extends IModel<TPrimaryKey>,
    TPrimaryKey,
    TGetAllModel extends PagedRequestDto,
    TCreateModel,
    TUpdateModel>

{
    protected baseUrl: string;
    protected loading: boolean;

    protected httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(protected _httpClient: HttpClient, protected uri: string) {
        this.baseUrl = `${environment.apiBaseUrl}${uri}`;
    }


    /**
     * GetAll Items
     * @param input
     */
    getAll(input?: TGetAllModel): Observable<any> {
        const queryStr = this.toPagedAndSortedString(input).replace(/[?&]$/, '');
        return this._httpClient.get<any>(`${this.baseUrl}/GetAll?${queryStr}`, this.httpOptions)
            .pipe(map(response => response), retry(1));
    }


    /**
     * Get Item by uniqueIdentifier
     * @param id uniqueIdentifier of item
     */
    get(id: TPrimaryKey): Observable<TModel> {
        return this._httpClient.get<ApiResultDto>(`${this.baseUrl}/Get?input.id=${id}`, this.httpOptions)
            .pipe(map(response => response.result), retry(1));
    }

    /**
     * Create new Item
     * @param input create model of Item
     */
    create(input: TCreateModel): Observable<TModel> {
        return this._httpClient.post<ApiResultDto>(this.baseUrl + '/Create', JSON.stringify(input), this.httpOptions)
            .pipe(map(response => response.result), retry(1));
    }

    /**
     * Update old Item
     * @param input update model of Item
     */
    update(input: TUpdateModel): Observable<TModel> {
        return this._httpClient.put<ApiResultDto>(`${this.baseUrl}/Update`, JSON.stringify(input), this.httpOptions)
            .pipe(map(response => response.result), retry(1));
    }

    /**
     * Delete Item by uniqueIdentifier
     * @param id uniqueIdentifier of item
     *
     */
    delete(id: TPrimaryKey): Observable<TModel> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {
                id: id
            },
        };


        return this._httpClient.delete<any>(`${this.baseUrl}/Delete/`+id, options)
            .pipe(map(response => response), retry(1));
    }


    // For Fix Url Calendar Events
    protected toPagedAndSortedString(getAllInput: TGetAllModel): string {
        let queryStr = '';
        if(getAllInput!== undefined)
        {
          if (getAllInput.postId !== undefined ) {
            queryStr += 'entityDto.postId=' + encodeURIComponent('' + getAllInput.postId) + '&';
        }
        }

        return queryStr;
    }


}
