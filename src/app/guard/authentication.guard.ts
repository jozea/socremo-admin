import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router) { }

    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!sessionStorage.getItem('authorization')) {
        console.log("unauthorized")
        this.router.navigate(['/app/dashboard'])
        this.router.navigateByUrl('/')
        return false;
      } else {
        return true;
      }
      // if(!sessionStorage.getItem('authorization')) {
      //   // console.log("unauthorized")
      //   this.router.navigateByUrl('/')
      //   return false;
      // } else {
      //   return true;
      // }
  }
  
}
