import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { AppConsts } from 'src/app/shared/AppConsts';
import { isNullOrUndefined } from 'util';


@Injectable({
    providedIn: 'root'
})
export class JwtService {

    private currentUserTokenSubject: BehaviorSubject<any>;
    public currentUserToken: Observable<any>;

    constructor() {
        this.currentUserTokenSubject = new BehaviorSubject<any>(this.getToken());
        this.currentUserToken = this.currentUserTokenSubject.asObservable();
    }

    public get currentUserTokenValue(): any {
        return this.currentUserTokenSubject.value;
    }

    saveToken(token: any): void {

        // token.refreshTokenExpiryTime = moment().add(token.refreshTokenExpiryTime, 'second');
        window.localStorage.setItem(AppConsts.usertokenLocalStorageName, JSON.stringify(token));
        this.currentUserTokenSubject.next(token);
    }

    destroyToken(): void {
        window.localStorage.removeItem(AppConsts.usertokenLocalStorageName);
        this.currentUserTokenSubject.next(null);
    }

    // tokenAccessIsExpired(): boolean{
    //     const token = this.currentUserTokenValue;
    //     return  !moment().isBefore(token.expires_at);
    // }

    tokenAccessIsExpired(): boolean{
        const token = this.currentUserTokenValue;
        return    (token === null || token === undefined) || !moment().isBefore(token.refreshTokenExpiryTime);
    }

    // tokenAccessIsExpired(): boolean{
    //     const token = this.currentUserTokenValue;
    //     const date = new Date();
    //     return  moment(date).isAfter(token.expires_at);
    // }

    private getToken(): any {
        return JSON.parse(window.localStorage.getItem(AppConsts.usertokenLocalStorageName));
    }




}
