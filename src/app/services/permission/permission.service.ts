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

// searchUserByMobile(mobileNumber): Observable<any> {
//   return this.http.post<any>(`${this.baseUrl}notif/regToken/${mobileNumber}`, {});
// }

// sendMessageToAll(model): Observable<any> {
//   return this.http.post<any>(`${this.baseUrl}notif/send`, model);
// }

// sendMessageToOne(model): Observable<any> {
//   return this.http.post<any>(`${this.baseUrl}notif`, model)
// }
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




searchUserByMobile(mobileNumber): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}notify/fBaseToken/${mobileNumber}`);
}


sendMessageToAll(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}notify/send`, model);
}


sendMessageToOne(model): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}notify`, model)
}

//notify/fBaseToken/61432c602d12497a87744f0c
//notify/send
//notify/



createResource(model:any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}access-control/resource/`, model)
}

getResource(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}access-control/resource/`)
}

createNewRole(model: any) {
  return this.http.post<any>(`${this.baseUrl}access-control/role/`, model)
}

getNewRole() {
  return this.http.get<any>(`${this.baseUrl}admin/access-control/roles`)
}

editResourceName(resourceId, resourceName) {
  return this.http.patch<any>(`${this.baseUrl}access-control/resource/${resourceId}/${resourceName}`, {})
}

fetchAdmins() {
  return this.http.get<any>(`${this.baseUrl}admin/list-admin`)
}


updateRolePermisssion(model, roleId) {
  return this.http.put<any>(`${this.baseUrl}access-control/role/${roleId}`, model)
}

editRoleResourcePermission(model) {
  return this.http.patch<any>(`${this.baseUrl}access-control/role`, model)
}

disableAndEnableResource(resourceId) {
  return this.http.delete<any>(`${this.baseUrl}access-control/resource/${resourceId}/true`)
}

disableAndRestoreRole(state, roleId) {
  return this.http.delete<any>(`${this.baseUrl}access-control/role/${roleId}/${state}`)
}

assignRole(roleId, userId) {
  return this.http.put<any>(`${this.baseUrl}access-control/role/${roleId}/${userId}`, {})
}




}
