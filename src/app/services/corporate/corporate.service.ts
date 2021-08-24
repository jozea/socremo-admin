import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { sha512 } from 'js-sha512';



@Injectable({
  providedIn: 'root'
})
export class CorporateService {

  // corpUrl: string = environment.corporateUrl;
  corpUrl: string = environment.API_KEY;
  baseUrl: string = environment.baseUrl;
  copUrl: string = environment.copUrl

  API_KEY = environment.API_KEY
  channel = 'web';
  role = 'admin'

  constructor(private http: HttpClient) { }

  // onBoardUsers(model: any): Observable<any> {
  //   return this.http.post<any>(`${this.copUrl}users`, model);
  // }

  onBoardUsers(model: any) {
    let apiURL = this.copUrl + 'users/wakandax-onboard';
    return this.http.post(apiURL, model).toPromise();
  }

  getDetailsByAccount(accountNumber: any): Observable<any> {
    let model = {
      accountNumber: accountNumber
    }
    return this.http.post<any>(`${this.baseUrl}accounts/accountDetails`, model);
  }

  getRepsDetails(data) {
    return this.http.post<any>(`${this.corpUrl}users/rep-details`, data);
  }

  getUsers(model, page, limit) {
    let apiURL = this.copUrl + `users?limit=${limit}&page=${page}`;
    return this.http.post(apiURL, model).toPromise();
  }

  approveOnboardedReps(model) {
    let apiURL = this.copUrl + 'users/wakandax-onboard-approval';
    return this.http.post(apiURL, model).toPromise();
  }

  updateRep(model) {
    let apiURL = this.copUrl + 'users/wakandax-update-rep';
    return this.http.post(apiURL, model).toPromise();
  }

  listInvestments(model) {
    let apiURL = this.copUrl + 'investments/admin/list-investment';
    return this.http.post(apiURL, model).toPromise();
  }

  fetchTransactions(model:any) {
    let apiURL = this.copUrl + 'transactions/admin/list-transactions';
    return this.http.post(apiURL, model).toPromise(); 
  }

  
}