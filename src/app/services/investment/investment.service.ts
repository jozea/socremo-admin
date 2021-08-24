import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { sha512 } from 'js-sha512';

 


@Injectable({
  providedIn: 'root'
})
export class InvestmentService {


  baseUrl: string = environment.baseUrl;
  API_KEY = environment.API_KEY
  channel = 'web'
  
  constructor(private http: HttpClient) { }

  // getInvestments(limit:number, page: number,model: any): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}investment/admin/list?limit=${limit}&page=${page}`, model);
  // }

  getInvestments(model: any, limit:number, page: number) {
    return this.http.post<any>(`${this.baseUrl}investment/admin/list?limit=${limit}&page=${page}`, model).toPromise();
  }

  getInvestmentTerms(model: any) {
    return this.http.post<any>(`${this.baseUrl}investment/terms-rates`, model).toPromise();
  }

  createInvestmentTerms(model: any) {
    return this.http.post<any>(`${this.baseUrl}investment/admin/create-term`, model).toPromise();
  }

  updateInvestmentTerms(model: any) {
    return this.http.put<any>(`${this.baseUrl}investment/admin/update-term`, model).toPromise();
  }

  addToInvestmentTerms(model: any) {
    return this.http.put<any>(`${this.baseUrl}investment/admin/addToTermDetails`, model).toPromise();
  }
  
}
