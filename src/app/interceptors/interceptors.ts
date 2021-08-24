import { AuthIntercept } from './auth.interceptor';
import { ErrorIntercept } from './error.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

export const interceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercept, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true},
]