import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()

export class ErrorIntercept implements HttpInterceptor {
    constructor(private router: Router, private bnIdle: BnNgIdleService,
        ) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage: any = {};
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage.message = error.error.message;
                        // console.log(error)
                    }else if (error.status == 429) {
                        // console.log(error)
                        sessionStorage.clear();
                        this.router.navigate(['/auth'])
                    } else {
                        // server-side error
                        // console.log(error)
                        errorMessage.status = error.status;
                        errorMessage.message = error.error.message ?? error.error;
                        // console.log(errorMessage)
                    }
                    return throwError(errorMessage);
                })
        )
    }
}