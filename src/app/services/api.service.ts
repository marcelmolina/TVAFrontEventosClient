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

  saveElection(json, token): Observable<any> {
    const url = `${this._baseURL}/save/election`;
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

  UrlEndByEventUser(id, token): Observable<any> {
    const url = `${this._baseURL}/events/urlend/${id}`;

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


  results(event_id, session_id, token): Observable<any> {
    const url = `${this._baseURL}/results`;

    return this.http
      .post(
        url,
        { event_id, session_id },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          })
        }
      )
      .pipe(map(data => data));
  }
}
