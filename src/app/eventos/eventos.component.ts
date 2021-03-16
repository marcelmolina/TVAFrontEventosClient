import { Question } from './question.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

import { AppConstants } from '../../constants';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  backgroundImage: string;
  blocks: Array<any>;
  totalSteps: number;
  actualStep: number;
  myToken: any;
  question: Question;
  constructor(private route: ActivatedRoute, private _apiService: ApiService) {
    this.actualStep = 0;
    this.backgroundImage = 'assets/img/fondo1.jpg';
    this.question = {
      event_id: '',
      answer: null,
      question: null,
      question_pool: null,
      survey: null
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (
        params['token'] != undefined &&
        params['id'] != undefined &&
        params['cookie-id'] != undefined
      ) {
        var token = params['token'];
        this.myToken = token;
        var id = params['id'];
        var cookieID = params['cookie-id'];

        this.validateAuth(token, id, cookieID);

        window.history.replaceState({}, document.title, '/');
      } else {
        let objetoTVA = JSON.parse(localStorage.getItem('objTVA'));

        if (objetoTVA == undefined) {
          window.location.href = AppConstants.loginURL;
        }

        var token = objetoTVA.token;
        this.myToken = token;
        var id = objetoTVA.eventID;
        var cookieID = objetoTVA.cookieID;
        console.log('Sacando data de local');

        this.validateAuth(token, id, cookieID);
      }
    });
  }
  validateAuth(token, id, cookieID) {
    fetch(AppConstants.baseURL, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: '*/*'
      },
      body: cookieID
    })
      .then(response => response.json())
      .then(data => {
        if (data.isAuth) {
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

            this.question.event_id = response.events_id;
            this.blocks = response.blocks;
            this.totalSteps = this.blocks.length;
          });
        } else {
          window.location.href = AppConstants.loginURL;
        }
      });
  }
  actions(action) {
    switch (action.name) {
      case 'NEXT':
        this.actualStep++;
        break;
      case 'SAVE_QUESTION':
        let eventIdJson = this.question.event_id;
        let questionJson = this.blocks[this.actualStep].questions[
          action.positionQuestion
        ].question;
        let question_poolJson = {
          description_qp: this.blocks[this.actualStep].config.description_qp,
          name_qp: this.blocks[this.actualStep].config.name_qp,
          question_pools_id: this.blocks[this.actualStep].config
            .question_pools_id
        };

        questionJson['position_qp'] = this.blocks[this.actualStep].questions[
          action.positionQuestion
        ].position_qp;
        let answerJson = action.data;

        let jsonFinal = {
          event_id: eventIdJson,
          answer: answerJson,
          question: questionJson,
          question_pool: question_poolJson
        };
        this._apiService.saveSurvey(jsonFinal, this.myToken).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
        break;
      default:
        break;
    }
  }
}
