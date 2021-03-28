import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  _baseURL: string;
  constructor(private http: HttpClient) {
    this._baseURL = environment.baseURL;
  }

  getEventById(id, token): Observable<any> {
    const url = `${this._baseURL}/events/${id}`;

    return this.http
      .get(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(data => data));
  }

  saveSurvey(json, token): Observable<any> {
    const url = `${this._baseURL}/save/survey`;
    const body = json;
    return this.http
      .post(url, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(data => data));
  }

  saveSession(json, token) {
    const url = `${this._baseURL}/session`;
    const body = json;
    return this.http
      .post(url, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(data => data));
  }
}
