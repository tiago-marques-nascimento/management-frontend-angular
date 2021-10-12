import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading/loading.service';
import { JwtService } from '../services/jwt/jwt.service';

@Injectable()
export class GenericHttpInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService, private jwtService: JwtService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.pushLoading();
    const modifiedReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${this.jwtService.token}`)
        .append('Content-Type', 'application/json'),
    });
    return next.handle(modifiedReq)
      .pipe(
        finalize(() => {
          this.loadingService.popLoading();
        })
      );
  }
}
