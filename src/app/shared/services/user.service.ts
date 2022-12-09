import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { Function, ProjectQuick, User } from '../models';
import { environment } from '../../../environments/environment';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  private _shareHeaders = new HttpHeaders();
  constructor(private http: HttpClient,
    private utilitiesService: UtilitiesService) {
    super();
    this._shareHeaders = this._shareHeaders.set('Content-Type', 'application/json');

  }
  getMenuByUser(userId: string) {
    return this.http.get<Function[]>(`${environment.apiUrl}/api/users/${userId}/menu`, { headers: this._shareHeaders })
      .pipe(map(response => {
        const fuctions = this.utilitiesService.UnflatteringForLeftMenu(response);
        return fuctions;
      }),
        catchError(this.handleError));
  }
  add(enity: User) {
    return this.http.post(`${environment.apiUrl}/api/users`, JSON.stringify(enity), { headers: this._shareHeaders })
      .pipe(catchError(this.handleError));
  }
  update(id: string, enity: User) {
    return this.http.put(`${environment.apiUrl}/api/users/${id}`, JSON.stringify(enity), { headers: this._shareHeaders })
      .pipe(catchError(this.handleError));
  }
  updateFe(id: string, enity: FormData) {
    // this._store.update((state) => ({
    //   ...state,
    //   ...enity
    // }));
    return this.http.post(`${environment.apiUrl}/api/users/${id}/uploadAvatar`, enity, {
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.handleError));
  }
  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`, { headers: this._shareHeaders })
      .pipe(map((response: User[]) => {
        return response;
      }), catchError(this.handleError));
  }
  getDetail(id) {
    return this.http.get(`${environment.apiUrl}/api/users/${id}`, { headers: this._shareHeaders })
      .pipe(catchError(this.handleError));
  }
  delete(id) {
    return this.http.delete(`${environment.apiUrl}/api/users/${id}`, { headers: this._shareHeaders })
      .pipe(catchError(this.handleError));
  }
  getUserRoles(userId: string) {
    return this.http.get<string[]>(`${environment.apiUrl}/api/users/${userId}/roles`, { headers: this._shareHeaders })
      .pipe(catchError(this.handleError));
  }
  removeRolesFromUser(id, roleNames: string[]) {
    let rolesQuery = '';
    for (const roleName of roleNames) {
      rolesQuery += 'roleNames' + '=' + roleName + '&';
    }
    return this.http.delete(environment.apiUrl + '/api/users/' + id + '/roles?' + rolesQuery, { headers: this._shareHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }
  assignRolesToUser(userId: string, assignRolesToUser: any) {
    return this.http.post(`${environment.apiUrl}/api/users/${userId}/roles`,
      JSON.stringify(assignRolesToUser), { headers: this._shareHeaders })
      .pipe(catchError(this.handleError));
  }
  getProjects(userId: string) {
    return this.http.get<ProjectQuick[]>(`${environment.apiUrl}/api/users/${userId}/projects`, { headers: this._shareHeaders })
      .pipe(map((response: ProjectQuick[]) => {
        return response;
      }), catchError(this.handleError));
  }
  authUser(userId) {
    return this.http.get<User>(`${environment.apiUrl}/api/users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }
}
