import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConsts } from 'src/app/shared/AppConsts';

@Injectable({
    providedIn: 'root'
})
export class UserSessionService {
    private currentUserAllLoginInfoModelSubject: BehaviorSubject<any>;
    public currentUserAllLoginInfo: Observable<any>;
    constructor() {
        this.currentUserAllLoginInfoModelSubject = new BehaviorSubject<any>(this.get());
        this.currentUserAllLoginInfo = this.currentUserAllLoginInfoModelSubject.asObservable();
    }

    public get currentUserAllLoginInfoValue(): any {
        return this.currentUserAllLoginInfoModelSubject.value;
    }

    saveCount(userSetting: any): void {
        window.localStorage.setItem(AppConsts.userUnreadMessag, JSON.stringify(userSetting));
    }


    save(userSetting: any): void {
        window.localStorage.setItem(AppConsts.userSessionLocalStorageName, JSON.stringify(userSetting));
        this.currentUserAllLoginInfoModelSubject.next(userSetting);
    }

    destroy(): void {
        window.localStorage.removeItem(AppConsts.userSessionLocalStorageName);
        this.currentUserAllLoginInfoModelSubject.next(null);
    }

    private get(): any {
        return JSON.parse(window.localStorage.getItem(AppConsts.userSessionLocalStorageName));
    }


}
