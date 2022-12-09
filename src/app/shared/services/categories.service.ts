import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import {Category} from '@tan2k/shared/models';
import {environment} from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class CategoriesService extends BaseService {
  private _sharedHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    super();
    this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }
  add(entity: Category) {
    return this.http.post(`${environment.apiUrl}/api/categories`, JSON.stringify(entity), { headers: this._sharedHeaders })
        .pipe(catchError(this.handleError));
  }

  update(id: number, entity: Category) {
    return this.http.put(`${environment.apiUrl}/api/categories/${id}`, JSON.stringify(entity), { headers: this._sharedHeaders })
        .pipe(catchError(this.handleError));
  }

  getDetail(id) {
    return this.http.get<Category>(`${environment.apiUrl}/api/categories/${id}`, { headers: this._sharedHeaders })
        .pipe(catchError(this.handleError));
  }
  delete(id) {
    return this.http.delete(environment.apiUrl + '/api/categories/' + id, { headers: this._sharedHeaders })
        .pipe(
            catchError(this.handleError)
        );
  }

  getAll() {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/categories`, { headers: this._sharedHeaders })
        .pipe(map((response: Category[]) => {
          return response;
        }), catchError(this.handleError));
  }
}
