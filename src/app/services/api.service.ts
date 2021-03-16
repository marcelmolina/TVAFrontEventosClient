import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  _baseURL: string;
  constructor(private http: HttpClient) {
    this._baseURL =
      'https://6mx1tdn5jb.execute-api.us-east-2.amazonaws.com/dev';
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
    const url = `${this._baseURL}/traking`;
    const body = json;
    return this.http
      .post(url, body, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map((data) => data));
  }


  saveTraking(json, token): Observable<any> {
    const url = `${this._baseURL}/traking`;
    const body = json;
    return this.http
      .post(url, body, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map((data) => data));
  }
}
