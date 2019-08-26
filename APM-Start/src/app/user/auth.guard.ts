import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  }

  // Unlike the canActivate, the canLoad method cannot access thr ActivatedRouteSnapshot or 
  // the RouterStateSnapshot because the module defining the route is not yet loaded
  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string) : boolean {
    if (this._authService.isLoggedIn) {
      return true;
    }

    this._authService.redirectUrl = url;
    this._router.navigate(['/login']);
    return false;
  }
}
