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
import { crypto } from 'crypto-js'
import { environment } from 'src/environments/environment';


export class AuthIntercept implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const createHash = async (req: Request): Promise<any> => {
        //     const API_KEY = 'SCDqGMNKLn_7LDcOOEsG4OQsFbOTVnYRR8T0eVx3Tj4=';
        //     const body = req.body;
        //     body['path'] = '/admin/insurance/templates';
        //     const text = `${API_KEY}|${JSON.stringify(body)}`;
        //     const hash = crypto.createHash('sha512', API_KEY).update(text).digest('hex');
        //     return hash;
        // };

        // let a = createHash(request.body)

        const path = request.url.split(/:\d{4}\/api/)[1]
        const text = `${environment.adminToken}|${JSON.stringify({...request.body, path})}`
        const hash = sha512.update(text).hex();


        // const channel = 'web';
        // let apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
        let timestamp = Date.now().toString();
        // const text = `${apiKey}|${channel}|${timestamp}`;
        // const hash = sha512(text);
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
                    // .set('x-timestamp', `${timestamp}`)
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