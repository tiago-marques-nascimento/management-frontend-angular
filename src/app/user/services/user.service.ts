import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GenericHttp } from 'src/app/shared/http/generic.http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Injectable()
export class UserService extends GenericHttp<User> {

    constructor(http: HttpClient, router: Router, alertService: AlertService) {
        super(http, router, alertService);
    }

    listAll(): Observable<User[]> {
        return this.list(`/user`);
    }

    find(name: string): Observable<User> {
        return this.get(`/user/${name}`);
    }

    save(user: User): Observable<any> {
        if (user.id) {
            return this.putEmpty(`/user`, user);
        } else {
            return this.postEmpty(`/user`, user);
        }
    }

    delete(id: string): Observable<any> {
        return this.deleteEmpty(`/user/${id}`);
    }
}
