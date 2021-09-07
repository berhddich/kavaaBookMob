import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services/jwt/jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _jwtService: JwtService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currenttoken = this._jwtService.currentUserTokenValue;
        console.log(currenttoken)
        console.log("walo")
        if (currenttoken && currenttoken.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currenttoken.token}`
                }
            });
        }


        return next.handle(request);
    }
}
