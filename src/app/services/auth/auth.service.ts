import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { sha512 } from 'js-sha512';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;
  API_KEY = environment.API_KEY
  channel = 'web'

  constructor(private http: HttpClient) { }

  // login(loginDetail: any): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}users/admin/login`, loginDetail);
  // }

  login(loginDetail: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/signin`, loginDetail);
  }
  
  logOutUser(logoutDetail: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/admin/logout`, logoutDetail);
  } 

  getAppVersion(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}app/getVersion`, {});
  }

  updateAppVersion(model: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}app/updateVersion`, model);
  }

  getKycTier(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}app/getVersion`, {});
  }

  updateKycTier(model: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}app/updateVersion`, model);
  }

}