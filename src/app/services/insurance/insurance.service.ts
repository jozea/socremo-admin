import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  fetchAllInsurance(model): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/insurance/templates/all`, model);
  }

  fetchInsuranceById(insuranceId): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/insurance/templates/${insuranceId}`, {});
  }

  createInsurance(model): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}admin/insurance/templates`, model)
  }

  updateInsurance(model): Observable<any>{
    return this.http.patch<any>(`${this.baseUrl}admin/insurance/templates`, model)
  } 

  assignInsurance(insuranceId, adminId): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}admin/insurance/assign/${insuranceId}/${adminId}`, {})
  } 
}
