import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

baseUrl: string = environment.baseUrl;

constructor(private http: HttpClient) {}

// filterUsers(limit: number, page: number, model: any): Observable<any> {
//   return this.http.post<any>(`${this.baseUrl}users/searchUser?limit=${limit}&page=${page}`, model);
// }

getAllUsers(limit: number, page: number, model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}customer/admin-fetch-customers?limit=${limit}&page=${page}`, model);
}

getSingleUser(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}customer/admin-fetch-customers?limit=1`, model);
}

getUserCount(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}users/admin/countUsers`, model);
}

accountSummary(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}users/admin/account/summary`, model);
}

accountRegistrationType(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}users/admin/accountTypes/count`, model);
}

accountReferralChart(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}users/admin/account/referral`, model);
}

getCurrentlyLoggedInUsers(): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}users/admin/loggedInUsers`, {});
}

getUserById(mobileNumber: string): Observable<any> {
  let obj = {
    mobileNumber: mobileNumber
  }
  return this.http.post<any>(`${this.baseUrl}users/admin`, obj);
}

getSecurityQst(): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}accounts/securityQuestions`, {});
}

updateUser(model:any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}users/admin/updateUser`, model);
}

}
