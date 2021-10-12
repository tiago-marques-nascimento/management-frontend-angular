import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GenericHttp } from 'src/app/shared/http/generic.http';
import { Role } from '../models/user.model';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Injectable()
export class RoleService extends GenericHttp<Role> {

    constructor(http: HttpClient, router: Router, alertService: AlertService) {
        super(http, router, alertService);
    }

    listAll(): Observable<Role[]> {
        return this.list(`/role`);
    }
}
