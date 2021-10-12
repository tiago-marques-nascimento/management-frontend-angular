import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class JwtService {

    token: string | undefined;
    subject = '';
    claims: string[] = [];
    loginSubject = new Subject<boolean>();

    constructor(private router: Router) {
    }

    login(token: string): void {
        this.token = token;
        this.parseJwt();
        this.triggerLogin();
    }

    logout(): void {
        this.token = undefined;
        this.triggerLogout();
        this.router.navigate(['login']);
    }

    parseJwt(): void {
        if (this.token)  {
            const decodedToken: any = jwt_decode(this.token);
            this.subject = decodedToken.sub;
            this.claims = decodedToken.claims;
        }
    }

    getLogin(): Observable<any> {
        return this.loginSubject.asObservable();
    }

    triggerLogin(): void {
        this.loginSubject.next(true);
    }

    triggerLogout(): void {
        this.loginSubject.next(false);
    }
}
