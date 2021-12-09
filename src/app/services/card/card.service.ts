import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }
  

  fetchCards(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admin/card/fetch`, {});
  }

  assignCard(cardId, adminId): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}admin/card/${cardId}/${adminId}`, {});
  }

  closCard( model: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}admin/card/close`, model);
  }

}
