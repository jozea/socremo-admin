import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoalService {

  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  
  getGoals(model: any, limit:number, page: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}goals/admin/retrieveGoals?limit=${limit}&page=${page}`, model);
  }
}
