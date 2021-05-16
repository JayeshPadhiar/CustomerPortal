import { Injectable } from '@angular/core';
// import { ErrorDialogService } from '../error-dialog/errordialog.service';
import * as data from './mockdata/data';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HTTP_INTERCEPTORS,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpUserEvent
} from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError, mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';


@Injectable() 
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor() {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return of(null).pipe(mergeMap(() => {
            return next.handle(request);
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        // pass through any requests not handled above

    }
 }
 export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
};
