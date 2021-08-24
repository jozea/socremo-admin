import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

baseUrl: string = environment.baseUrl;

constructor(private http: HttpClient) { }

getAllFeedbacks(
  limit: number,
  page: number,
  model: any
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}feedbacks/fetch?limit=${limit}&page=${page}`, model);
}

getAllAudit(
  limit: number,
  page: number,
  model: any
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}feedbacks/getAudits?limit=${limit}&page=${page}`, model);
}

getAllNotificationLog(
  limit: number,
  page: number,
  model: any
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}feedbacks/getNotifications?limit=${limit}&page=${page}`, model);
}


getAllReferrals(
  limit: number,
  page: number,
  model: any,
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}accounts/admin/rewards?limit=${limit}&page=${page}`, model);
}

rewardReferral(
  model: any,
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}accounts/rewardReferral`, model);
}

getGlobalWalletBalance(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}users/admin/global/wallet`, model);
}

getBranches(limit: number, page: number, model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}locations/admin/branches?limit=${limit}&page=${page}`, model);
}

createBranch(model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}locations/branch/create`, model);
}

fetchPSRecords(perPage: number, page: number, from: string, to:string, state: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}finances/admin/fetchPSRecord?perPage=${perPage}&page=${page}&from=${from}&to=${to}&state=${state}`, {});
}

fetchEnquireisAndComplaints(limit: number, page: number, model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}feedbacks/admin/enquiriesandcomplaints?limit=${limit}&page=${page}`, model);
}



}
