import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgencyService {

baseUrl: string = environment.agencyBaseUrl;
baseUrl2: string = environment.baseUrl;

constructor(private http: HttpClient) { }

fetchAgentTransactions(
  limit: number,
  page: number,
  model: any,
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}transactions/admin/filter?limit=${limit}&page=${page}`, model);
}

getAllFees(
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}agency/getFees`, {});
}

getAllBanks(
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl2}accounts/getBanks`, {});
}

updateFees(
  model: any
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}agency/updateFees`, model);
}

createAgent(
  model: any
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}agents/createAgentV2`, model);
}

fetchAllAgents(
  limit: number,
  page: number,
  model: any
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}agents/admin?limit=${limit}&page=${page}`, model);
}


}

