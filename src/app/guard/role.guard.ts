import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {

        const allowedPermissions = route.data['allowedPermissions'];

        const loggedInUser: any = JSON.parse(sessionStorage.getItem('user'));

        if (loggedInUser) {
          return  loggedInUser.permissions.permissions.some(r => {

                const routePermission = allowedPermissions.filter(item => item === r.action)
                if (routePermission.length) {
                    return r.action === "dashboard" ? true : r.isPermitted;
                }
            })
        }else {
            // console.log("", "Not enough permission to access this page", 'info')
            // this.router.navigate(['/pages/login']);
            return false;
        }
    }
}
