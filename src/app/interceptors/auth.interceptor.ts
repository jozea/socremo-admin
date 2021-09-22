// import {
//     HttpEvent,
//     HttpHandler,
//     HttpRequest,
//     HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export class AuthIntercept implements HttpInterceptor {
//     intercept(
//         request: HttpRequest<any>,
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//        if(sessionStorage.getItem('authorization')) {
//         request = request.clone({
//             setHeaders: {
//                 Authorization: `Bearer ${sessionStorage.getItem('authorization')}`
//             }
//         });
//        }else {
//            console.log('no auth')
//        }
//         return next.handle(request)
//     }
// }

import {HttpEvent,HttpHandler,HttpRequest, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { sha512 } from 'js-sha512'; 


export class AuthIntercept implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const channel = 'web';
        let apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
        let timestamp = Date.now().toString();
        const text = `${apiKey}|${channel}|${timestamp}`;
        const hash = sha512(text);
        let addon
        // if (request.url.includes('users/wakandax-onboard') || 
        //     request.url.includes('users?limit') ||
        //     request.url.includes('users/wakandax-update-rep') ||
        //     request.url.includes('investments/admin/list-investment') ||
        //     request.url.includes('transactions/admin/list-transactions')) {
        //     addon = { timestamp:timestamp }
        // }else {
        //     addon = { timestamp:timestamp, channel:channel}
        // }
        request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${sessionStorage.getItem('authorization')}`)
                    .set('x-timestamp', `${timestamp}`)
                    .set('api-key', hash),
            // body:{ ...request.body, ...addon }
            
        })
        // if (sessionStorage.getItem('authorization')) {
        //     request = request.clone({
                // setHeaders: {
                //     Authorization: `Bearer ${sessionStorage.getItem('authorization')}`
                // }
        //     });
        // } else {
        //     console.log('no auth')
        // }
        return next.handle(request)
    }
}