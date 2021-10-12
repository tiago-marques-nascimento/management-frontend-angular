import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert/alert.service';

export class GenericHttp<T> {

    static readonly BASE_URL: string = 'https://localhost:8080/api';

    constructor(private http: HttpClient, protected router: Router, private alertService: AlertService) {
    }

    protected list(url: string): Observable<T[]> {
        return this.http.get<{data: T[]}>(GenericHttp.BASE_URL + url).pipe(map(item => item.data),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected get(url: string): Observable<T> {
        return this.http.get<{data: T}>(GenericHttp.BASE_URL + url).pipe(map(item => item.data),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected post(url: string, body: T): Observable<T> {
        return this.http.post<{data: T}>(GenericHttp.BASE_URL + url, body).pipe(map(item => item.data),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected put(url: string, body: T): Observable<T> {
        return this.http.put<{data: T}>(GenericHttp.BASE_URL + url, body).pipe(map(item => item.data),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected delete(url: string): Observable<T> {
        return this.http.delete<{data: T}>(GenericHttp.BASE_URL + url).pipe(map(item => item.data),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected postGeneric<R>(url: string, body: T): Observable<R> {
        return this.http.post<{data: R}>(GenericHttp.BASE_URL + url, body).pipe(map(item => item.data),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected putGeneric<R>(url: string, body: T): Observable<R> {
        return this.http.put<{data: R}>(GenericHttp.BASE_URL + url, body).pipe(map(item => item.data),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected deleteGeneric<R>(url: string): Observable<R> {
        return this.http.delete<{data: R}>(GenericHttp.BASE_URL + url).pipe(map(item => item.data),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected postEmpty(url: string, body: T): Observable<any> {
        return this.http.post<any>(GenericHttp.BASE_URL + url, body).pipe(map(item => item),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected putEmpty(url: string, body: T): Observable<any> {
        return this.http.put<any>(GenericHttp.BASE_URL + url, body).pipe(map(item => item),
            catchError(e => this.handleError(e, this.alertService)));
    }

    protected deleteEmpty(url: string): Observable<any> {
        return this.http.delete<any>(GenericHttp.BASE_URL + url).pipe(map(item => item),
            catchError(e => this.handleError(e, this.alertService)));
    }

    private handleError(res: HttpErrorResponse, alertService: AlertService): Observable<any> {
        console.error(res.error);
        switch (res.status) {
            case 400:
                this.alertService.triggerError(res.error.data);
                break;
            case 401:
                this.router.navigate(['/login']);
                break;
            case 403:
                this.router.navigate(['/unauthorized']);
                break;
            default:
                this.alertService.triggerError('Unexpected error, we are working to solve this');
                break;
        }
        return observableThrowError(res.error || 'Server error');
    }
}
