import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {

    subject = new Subject<number>();

    getLoading(): Observable<number> {
        return this.subject.asObservable();
    }

    pushLoading(): void {
        this.subject.next(1);
    }

    popLoading(): void {
        this.subject.next(-1);
    }
}
