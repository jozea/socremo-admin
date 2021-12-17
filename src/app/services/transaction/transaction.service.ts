import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

baseUrl: string = environment.baseUrl;

constructor(private http: HttpClient) { }

// getAllTransactions(
//   limit: number,
//   page: number,
//   model: any,
// ): Observable<any> {
//   return this.http.post<any>(`${this.baseUrl}transactions/admin/filter?limit=${limit}&page=${page}`, model);
// }


getTransactionByUserId(user: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}transactions/getTransactions`, user);
}

getTransactionVolValByDateRange(model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}transactions/admin/dateRange`, model);
}

getIncomePerChannel(model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}transactions/admin/income/channel`, model);
}

getIncomePerTransactionType(model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}transactions/admin/income/transactionType`, model);
}
getAllTransactionVolumeValue(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}transactions/admin/transactionTotals`, model);
}
getTransactionCategories(model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}transactions/admin/transactionCategory`, model);
}
getTransactionStatus(model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}transactions/admin/transactionStatus`, model);
}




getAllTransactions(
  limit: number,
  page: number,
  model: any,
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}admin/transactions?limit=${limit}&page=${page}`, model);
}
}
