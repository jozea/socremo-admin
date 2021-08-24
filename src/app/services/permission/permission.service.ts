import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PermissionService {

baseUrl: string = environment.baseUrl;

constructor(private http: HttpClient) {}


searchUser(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}users/queryUserByMobile`, model);
}

searchUserByMobile(mobileNumber): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}notif/regToken/${mobileNumber}`, {});
}

sendMessageToAll(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}notif/send`, model);
}

sendMessageToOne(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}notif`, model)
}
assignUserToRole(model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}permission/assignRole`, model);
}
approveUser(model: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}permission/approveAdmin`, model);
}

getAllAdmins(
  limit: number,
  page: number,
  model: any
): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}users/admin/getAdmin?limit=${limit}&page=${page}`, model);
}

createRole(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}permission/addRole`, model);
}

deleteRoles(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}permission/deleteRole`, model);
}
userReg(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}permission/assignRole`, model);
}

getAllRoles(): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}permission/getAllRoles`, {});
}
getAllPermissions(): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}permission/getAllPermissions`, {});
}




}
