import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {Issue} from '../models';
import {BaseService} from './base.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssuesService extends BaseService {
  private _sharedHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    super();
    this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }
    getAllByProjectId(projectId) {
      return this.http.get<Issue[]>(`${environment.apiUrl}/api/issues/projects/${projectId}`, {headers: this._sharedHeaders})
          .pipe(map((response: Issue[]) => {
              return response;
          }), catchError(this.handleError));
    }
  delete(id) {
    return this.http.delete(environment.apiUrl + '/api/issues/' + id, { headers: this._sharedHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }
  getDetail(id) {
    return this.http.get<Issue>(`${environment.apiUrl}/api/issues/${id}`, {headers: this._sharedHeaders})
      .pipe(catchError(this.handleError));
  }
  deleteAttachment(issueId, attachmentId) {
    return this.http.delete(environment.apiUrl + '/api/issues/' + issueId
      + '/attachments/' + attachmentId, { headers: this._sharedHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }
  update(id: string, formData: FormData) {
    return this.http.put(`${environment.apiUrl}/api/issues/${id}`, formData,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(catchError(this.handleError));
  }
  add(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/api/issues`, formData,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(catchError(this.handleError));
  }
}
