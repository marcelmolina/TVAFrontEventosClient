import { EventoService } from './../evento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  backgroundImage: string;
  constructor(private route: ActivatedRoute, private _apiService: ApiService) {
    this.backgroundImage = 'assets/img/fondo1.jpg';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (
        params['token'] != undefined &&
        params['id'] != undefined &&
        params['cookie-id'] != undefined
      ) {
        var token = params['token'];
        var id = params['id'];
        var cookieID = params['cookie-id'];

        console.log(token, id, cookieID);

        window.history.replaceState({}, document.title, '/');

        fetch(
          'https://6mx1tdn5jb.execute-api.us-east-2.amazonaws.com/dev/validate/token',
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + params['token'],
              Accept: '*/*'
            },
            body: params['cookie-id']
          }
        )
          .then(response => response.json())
          .then(data => {
            if (data.isAuth) {
              console.log(data);

              localStorage.setItem(
                'objTVA',
                JSON.stringify({
                  token: token,
                  cookieID: cookieID,
                  eventID: id
                })
              );

              this._apiService.getEventById(id, token).subscribe(response => {
                console.log(response);
              });
            } else {
              window.location.href = 'https://d3eyeduwkwyhna.cloudfront.net/';
            }
          });
      }
    });
  }
}
