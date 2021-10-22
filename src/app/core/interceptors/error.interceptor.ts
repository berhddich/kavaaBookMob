import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorModel } from '../models/error-model';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService,    public toastController: ToastController,
      ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // Get client-side error
                errorMessage = error.error.message;
            }
            // Get server-side error
            else if (error.status === 0) {
                errorMessage = 'The server is not available';
            }
            else if (error.status === 401) {
                // auto logout if 401 response returned from api
                // if (request.url.includes('OAuth')) {
                this._authService.logout();
                location.reload();
                // }
                return;
            }
            else if (error.status === 400 && request.url.includes('Authentication') ) {
                this._authService.logout();
                location.reload();
                return;
            }
            else {
                const serverError = error.error as ErrorModel;
                if (serverError.error['message']) {
                    errorMessage = `Error Code: ${error.status}\nMessage: ${serverError.error.message}`;
                    this.presentToast(errorMessage );

                } else{
                    errorMessage = error.error['error_description'];
                }
            }
            console.log(errorMessage);
            this.presentToast(errorMessage );
            return throwError(errorMessage);
        }));
    }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }
}
