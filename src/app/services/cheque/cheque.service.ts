import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChequeService {

  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }
  

  fetchCheckBooks( model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admin/cheque-books`, model);
  }

  assignCheckBook( chequeId, adminId): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}admin/cheque-book/${chequeId}/${adminId}`, {});
  }

  closCheckBook( model: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}admin/cheque-book/close`, model);
  }

  
}
