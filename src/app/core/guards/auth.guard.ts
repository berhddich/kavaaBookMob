import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private router: Router,
        private _authService: AuthService ,
        public NavController: NavController
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._authService.islogin()) {
            // logged in so return true
            return true;
        }
        this.NavController.navigateRoot('home')

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }





    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: any): boolean {
        // const url = `/${route.path}`;
        return this.canActivate(route, null);
    }

    canActivateByPermissions(): boolean {


        return false;
    }

}
