import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AlertService {

    subject: Subject<Alert> = new Subject<Alert>();

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    triggerSuccess(message: string): void {
        this.subject.next({type: Alert.TYPE_SUCCESS, message});
    }

    triggerWarning(message: string): void {
        this.subject.next({type: Alert.TYPE_WARNING, message});
    }

    triggerError(message: string): void {
        this.subject.next({type: Alert.TYPE_ERROR, message});
    }
}

export class Alert {
    static readonly TYPE_SUCCESS: number = 0;
    static readonly TYPE_WARNING: number = 1;
    static readonly TYPE_ERROR: number = 2;

    message: string | undefined;
    type: number | undefined;
}
