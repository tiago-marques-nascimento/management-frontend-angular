import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '../services/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public jwtService: JwtService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.jwtService.token) {
            this.router.navigate(['login']);
            return false;
        }
        const routeClaims: string[] = route.data.claims;
        const userClaims: string[] = this.jwtService.claims;
        const canAccess = routeClaims.filter(routeClaim => userClaims.filter(userClaim => userClaim === routeClaim).length > 0).length > 0;
        if (!canAccess) {
            this.router.navigate(['unauthorized']);
        }
        return canAccess;
    }
}
