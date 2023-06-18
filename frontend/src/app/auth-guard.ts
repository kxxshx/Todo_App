import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth-services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isAutheticated()) {
      // console.log("checking "+ this.authService.isAutheticated())
      //  this.router.navigate(['/dashboard'])
      return true;
    }
    else {
      // console.log("checked "+ this.authService.isAutheticated())
      this.router.navigate(['/login']);
      return false;
    }
  }

}
