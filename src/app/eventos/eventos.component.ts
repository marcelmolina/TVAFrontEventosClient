import { Question } from './question.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

import { environment } from '../../environments/environment';

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
  myEvent: any;
  myCookieId: any;
  question: Question;
  session_id: any;
  constructor(private route: ActivatedRoute, private _apiService: ApiService) {
    this.session_id = null;
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
        this.myEvent = id;
        var cookieID = params['cookie-id'];
        this.myCookieId = cookieID;

        this.validateAuth(token, id, cookieID);

        window.history.replaceState({}, document.title, '/');
      } else {
        let objetoTVA = JSON.parse(localStorage.getItem('objTVA'));

        if (objetoTVA == undefined) {
          // window.location.href = environment.loginURL;
        }

        var token = objetoTVA.token;
        this.myToken = token;
        var id = objetoTVA.eventID;
        this.myEvent = id;
        var cookieID = objetoTVA.cookieID;
        this.myCookieId = cookieID;

        this.validateAuth(token, id, cookieID);
      }
    });
  }

  validateAuth(token, id, cookieID) {
    fetch(environment.baseURL + '/validate/token', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: '*/*'
      },
      body: cookieID
    })
      .then(response => response.json())
      .then(
        data => {
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
              let b: Array<any> = response.blocks;
              console.log(response);

              this.question.event_id = response.events_id;
              this.firtsTime(b);
            });
          } else {
            window.location.href = environment.loginURL;
          }
        },
        error => {
          window.location.href = environment.loginURL;
        }
      );
  }

  actions(action) {
    console.log(this.session_id);

    switch (action.name) {
      case 'NEXT':
        this.actualStep++;

        if (this.blocks[this.actualStep].type == 'url-end') {
          let actions = {
            name: 'SESSION_0',
            type: this.blocks[this.actualStep].type,
            step: 0
          };
          this.actions(actions);
          actions.name = 'SESSION_1';
          this.actions(actions);
          window.location.href = this.blocks[
            this.actualStep
          ].config.destination_url;
        }

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

        questionJson['question_id'] = this.blocks[this.actualStep].questions[
          action.positionQuestion
        ].question_id;
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
      case 'SESSION_0':
        if (action.type == 'surveys') {
          let json = {
            session_id: this.session_id,
            step: `event/${this.myEvent}/${this.actualStep}/${action.type}/${action.step}`,
            event_id: this.myEvent,
            status: 0
          };
          this.saveSession(json, this.myToken);
        } else {
          let json = {
            session_id: this.session_id,
            step: `event/${this.myEvent}/${this.actualStep}/${action.type}`,
            event_id: this.myEvent,
            status: 0
          };
          this.saveSession(json, this.myToken);
        }

        break;
      case 'SESSION_1':
        if (action.type == 'surveys') {
          let json = {
            session_id: this.session_id,
            step: `event/${this.myEvent}/${this.actualStep}/${action.type}/${action.step}`,
            event_id: this.myEvent,
            status: 1
          };
          this.saveSession(json, this.myToken);
        } else {
          let json = {
            session_id: this.session_id,
            step: `event/${this.myEvent}/${this.actualStep}/${action.type}`,
            event_id: this.myEvent,
            status: 1
          };
          this.saveSession(json, this.myToken);
        }
        break;
      default:
        break;
    }
  }
  saveSession(json, token) {
    this._apiService.saveSession(json, token).subscribe(
      (response: any) => {
        this.session_id = response.session_id;
      },
      error => {
        console.log(error);
      }
    );
  }

  ifQueryString(url) {
    if (url.indexOf('?') != -1) return true;
    return false;
  }
  firtsTime(b) {
    if (b[this.actualStep].type == 'surveys') {
      let json = {
        session_id: this.session_id,
        step: `event/${this.myEvent}/${this.actualStep}/surveys/0`,
        event_id: this.myEvent,
        status: 0
      };
      this._apiService.saveSession(json, this.myToken).subscribe(
        (response: any) => {
          this.session_id = response.session_id;
          this.blocks = b;
          this.totalSteps = this.blocks.length;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      let json = {
        session_id: this.session_id,
        step: `event/${this.myEvent}/${this.actualStep}/${b[this.actualStep].type
          }`,
        event_id: this.myEvent,
        status: 0
      };
      this._apiService.saveSession(json, this.myToken).subscribe(
        (response: any) => {
          this.session_id = response.session_id;
        },
        error => {
          console.log(error);
        },
        () => {
          if (b[this.actualStep].type == 'url-end') {
            let json = {
              session_id: this.session_id,
              step: `event/${this.myEvent}/${this.actualStep}/${b[this.actualStep].type
                }`,
              event_id: this.myEvent,
              status: 1
            };
            this._apiService.saveSession(json, this.myToken).subscribe(
              (response: any) => {
                this.session_id = response.session_id;
              },
              error => {
                console.log(error);
              },
              () => {
                if (
                  this.ifQueryString(b[this.actualStep].config.destination_url)
                ) {
                  window.location.href =
                    b[this.actualStep].config.destination_url +
                    `&token=${this.myToken}&id=${this.myEvent}&session-id=${this.session_id}&cookie-id=${this.myCookieId}`;
                } else {
                  window.location.href =
                    b[this.actualStep].config.destination_url +
                    `?token=${this.myToken}&id=${this.myEvent}&session-id=${this.session_id}&cookie-id=${this.myCookieId}`;
                }
              }
            );
          } else {
            this.blocks = b;
            this.totalSteps = this.blocks.length;
          }
        }
      );
    }
  }
}
