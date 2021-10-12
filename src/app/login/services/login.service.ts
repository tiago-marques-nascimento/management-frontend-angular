import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GenericHttp } from 'src/app/shared/http/generic.http';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Injectable()
export class LoginService extends GenericHttp<Login> {

    constructor(http: HttpClient, router: Router, alertService: AlertService) {
        super(http, router, alertService);
    }

    login(login: Login): Observable<string> {
        return this.postGeneric<string>(`/login`, login);
    }
}
