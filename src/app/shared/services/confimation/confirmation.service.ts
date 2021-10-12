import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ConfirmationService {

    confirmationSubject = new Subject<boolean>();
    openSubject = new Subject<any>();

    getOpen(): Observable<any> {
        return this.openSubject.asObservable();
    }

    getConfirmation(): Observable<boolean> {
        return this.confirmationSubject.asObservable();
    }

    triggerYes(): void {
        this.confirmationSubject.next(true);
    }

    triggerNo(): void {
        this.confirmationSubject.next(false);
    }

    triggerOpen(): void {
        this.openSubject.next();
    }
}
