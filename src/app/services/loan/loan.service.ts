  import { environment } from './../../../environments/environment';
  import { Injectable } from '@angular/core';
  import {HttpClient} from '@angular/common/http';
  import { Observable } from 'rxjs';
  
  
  @Injectable({
    providedIn: 'root'
  })
  export class LoanService {
  
  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }
  
  totalLoan(limit:number, page: number, model: any): Observable<any> {
    delete model.dayRange // appended from dashboard
    return this.http.post<any>(`${this.baseUrl}loans/admin/fetch?limit=${limit}&page=${page}`, model);
  }

  getLoanGatewayResponse(limit:number, page: number, model: any): Observable<any>{
    delete model.dayRange // appended from dashboard
    return this.http.post<any>(`${this.baseUrl}loans/admin/cardLoanGatewayResponse?limit=${limit}&page=${page}`, model);
  }

  getLoanData(limit:number, page: number, model: any): Observable<any> {
    delete model.dayRange // appended from dashboard
    return this.http.post<any>(`${this.baseUrl}loans/admin/fetch?limit=${limit}&page=${page}`, model);
  }

  getLoanData2(limit:number, page: number): Observable<any> {
    // delete model.dayRange // appended from dashboard
    return this.http.post<any>(`${this.baseUrl}cards/getCards?limit=${limit}&page=${page}`, {});
  }
  
  getLoanByMobileNumber(model: any): Observable<any> {
    delete model.mobileNumber
    return this.http.post<any>(`${this.baseUrl}loans/existingLoan`, model);
  }

  fetchLoanSummary(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}loans/admin/summary`, model);
  }
  
  
  
  updateLoanSettings(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}loans/admin/settings`, model);
  }

  requestStatusUpdate(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}loans/admin/requestStatusUpdate`, model);
  }

  approveStatusUpdate(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}loans/admin/approveStatusUpdate`, model);
  }

  storeRenewalScore(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}loans/store-renewal-score`, model);
  }

  getLoanHistory(limit:number, page: number, model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admin/loan/history?limit=${limit}&page=${page}`, model);
  }





  getLoanSettings(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/loan/settings/all`);
  }

  createLoanSettings(model): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admin/loan/settings`, model);
  }

  updateLoanSetting(model): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}admin/loan/settings`, model);
  }

  imageUpload(data: any) {
    return this.http.post<any>(`${this.baseUrl}admin/files/admin/loan-image`, data)
  }

  assignLoan(loanId, adminId): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/loan/assign-loan/${loanId}/${adminId}`);
  }

  updateLoanStatus(model): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}admin/loan/update-loan-status`, model);
  }
  
  }
  