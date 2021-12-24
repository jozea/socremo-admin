import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  
  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getFAQ(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/faqs`);
  }

  addFAQ(model): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admin/faq`, model);
  }

  editFAQ(model): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}admin/faq`, model);
  }

  deleteFAQ(model): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}admin/faq/${model}`);
  }
}
  
