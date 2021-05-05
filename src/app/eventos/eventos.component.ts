import { Question } from './question.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import { environment } from '../../environments/environment';

import swal from 'sweetalert2';
import { ErrorService } from '../shared/error/error.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  backgroundImage: string;
  backgroundProperty: string;
  blocks: Array<any>;
  totalSteps: number;
  actualStep: number;
  myToken: any;
  myEvent: any;
  myCookieId: any;
  question: Question;
  session_id: any;
  eventHasEnded: boolean = false;
  waitingForApi: boolean;
  showResults: boolean;
  sessionState: number;

  constructor(
    private route: ActivatedRoute,
    private _apiService: ApiService,
    private router: Router,
    private errorService: ErrorService
  ) {
    this.session_id = null;
    this.waitingForApi = false;
    this.actualStep = 0;
    this.question = {
      event_id: '',
      answer: null,
      question: null,
      question_pool: null,
      survey: null,
    };
  }

  ngOnInit(): void {
    this.sessionState = 0;
    this.route.queryParams.subscribe((params) => {
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
        Accept: '*/*',
      },
      body: cookieID,
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (data.isAuth) {
            localStorage.setItem(
              'objTVA',
              JSON.stringify({
                token: token,
                cookieID: cookieID,
                eventID: id,
              })
            );

            this._apiService.getEventById(id, token).subscribe(
              (response) => {
                let w = window.innerWidth;

                if (w <= 768) {
                  this.backgroundImage = response.backgrounds.img_mobile.split(
                    '?'
                  )[0];
                }

                if (w > 768 && w <= 1024) {
                  this.backgroundImage = response.backgrounds.img_tablet.split(
                    '?'
                  )[0];
                }

                if (w > 1024) {
                  this.backgroundImage = response.backgrounds.img_desktop.split(
                    '?'
                  )[0];
                }

                if (this.backgroundImage == '') {
                  this.backgroundProperty = 'background-color: #732370;';
                } else {
                  this.backgroundProperty =
                    'background: url(' +
                    this.backgroundImage +
                    ') no-repeat center center / cover';
                }

                let b: Array<any> = response.blocks;
                let baux = [];

                this.question.event_id = response.events_id;

                for (let index = 0; index < b.length; index++) {
                  const element = b[index];

                  let size = this.getSize(element.config);

                  if (size > 0) {
                    if (element.type == 'elections') {
                      if (element.showResult == true) {
                        this.showResults = true;
                      }
                    }
                    baux.push(element);
                  } else {
                    if (element.type == 'elections') {
                      if (element.showResult == true) {
                        this.showResults = false;
                      }
                    }
                    if (element.type == 'results' && this.showResults == true) {
                      baux.push(element);
                    }
                  }
                }

                if (baux.length > 0) {
                  this.firtsTime(baux);
                } else {
                  this.errorService.errorText = 'Página no encontrada';
                  this.router.navigate(['error']);
                }
              },
              (err) => {
                if (
                  err.error.error ==
                  'The current date is not in the date range of the event.'
                ) {
                  this.eventHasEnded = true;
                  this.errorService.errorText = 'Página no encontrada';
                  this.router.navigate(['error']);
                }

                if (err.error.error == 'Event invalid.') {
                  this.errorService.errorText = 'Página no encontrada';
                  this.router.navigate(['error']);
                }

                if (err.error.error == 'Event stoped.') {
                  this.errorService.errorText = 'Página no encontrada';
                  this.router.navigate(['error']);
                }
              }
            );
          } else {
            window.location.href = environment.loginURL;
          }
        },
        (error) => {
          window.location.href = environment.loginURL;
        }
      );
  }

  actions(action) {
    switch (action.name) {
      case 'NEXT':
        if (this.session_id != null) {
          if (this.sessionState == 0) {
            let actions = {
              name: 'SESSION_1',
              type: this.blocks[this.actualStep].type,
              step: 1,
            };
            this.actions(actions);
          }
        }
        if (this.actualStep < this.blocks.length - 1) {
          this.actualStep++;

          let actions = {
            name: 'SESSION_0',
            type: this.blocks[this.actualStep].type,
            step: 0,
          };
          this.actions(actions);
        } else {
          this.errorService.errorText = 'Página no encontrada';
          this.router.navigate(['error']);
        }

        if (
          this.blocks[this.actualStep].type == 'url-end' &&
          this.waitingForApi == false
        ) {
          /*           let actions = {
            name: 'SESSION_0',
            type: this.blocks[this.actualStep].type,
            step: 0,
          };
          this.actions(actions);
          actions.name = 'SESSION_1';
          this.actions(actions);
          window.location.href = this.blocks[
            this.actualStep
          ].config.destination_url; */

          let goToUrl;
          this._apiService
            .UrlEndByEventUser(this.myEvent, this.myToken)
            .subscribe(
              (response) => {
                goToUrl = response.redirect;
                this.errorService.codeHtml = response.codeHtml;
              },
              (error) => {},
              () => {
                if (goToUrl) {
                  this.processBlocks(this.blocks);
                } else {
                  this.errorService.errorText = 'Gracias por visitarnos';

                  this.router.navigate(['error']);
                }
              }
            );
        }

        let size = this.getSize(this.blocks[this.actualStep].config);
        if (size < 1 && this.actualStep < this.blocks.length - 1) {
          if (this.blocks[this.actualStep].type != 'results') {
            this.actions({ name: 'NEXT' });
          }
          break;
        }

        if (size < 1 && this.blocks[this.actualStep].type != 'results') {
          this.errorService.errorText = 'Página no encontrada';
          this.router.navigate(['error']);
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
            .question_pools_id,
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
          question_pool: question_poolJson,
        };

        this.waitingForApi = true;

        this._apiService.saveSurvey(jsonFinal, this.myToken).subscribe(
          (response) => {},
          (error) => {},
          () => {
            this.waitingForApi = false;
            if (
              this.blocks[this.actualStep].type == 'url-end' &&
              this.waitingForApi == false
            ) {
              let actions = {
                name: 'SESSION_0',
                type: this.blocks[this.actualStep].type,
                step: 0,
              };
              this.actions(actions);
              actions.name = 'SESSION_1';
              this.actions(actions);
              window.location.href = this.blocks[
                this.actualStep
              ].config.destination_url;
            }
          }
        );
        break;

      case 'SAVE_ELECTION':
        let json = {
          event_id: this.myEvent,
          candidates: action.data,
        };

        this._apiService.saveElection(json, this.myToken).subscribe(
          (response) => {
            swal
              .fire({
                title: 'Genial!',
                text: 'Votación enviada',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#332255',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancelar',
              })
              .then((result) => {
                this.actions({ name: 'NEXT' });
              });
          },
          (error) => {}
        );

        break;

      case 'SESSION_0':
        if (action.type == 'surveys') {
          let json = {
            session_id: this.session_id,
            step: `event/${this.myEvent}/${this.actualStep}/${action.type}/${action.step}`,
            event_id: this.myEvent,
            status: 0,
          };
          this.saveSession(json, this.myToken);
        } else {
          let json = {
            session_id: this.session_id,
            step: `event/${this.myEvent}/${this.actualStep}/${action.type}`,
            event_id: this.myEvent,
            status: 0,
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
            status: 1,
          };
          this.saveSession(json, this.myToken);
        } else {
          let json = {
            session_id: this.session_id,
            step: `event/${this.myEvent}/${this.actualStep}/${action.type}`,
            event_id: this.myEvent,
            status: 1,
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

        if (this.sessionState == 0) {
          this.sessionState = 1;
        } else {
          this.sessionState = 0;
        }
      },
      (error) => {}
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
        status: 0,
      };
      this._apiService.saveSession(json, this.myToken).subscribe(
        (response: any) => {
          this.session_id = response.session_id;
          this.blocks = b;

          let size = this.getSize(b[this.actualStep].config);
          if (size < 1) {
            this.actions({ name: 'NEXT' });
          }

          this.totalSteps = this.blocks.length;
        },
        (error) => {}
      );
    } else {
      if (b[this.actualStep].type == 'url-end') {
        let goToUrl;
        this._apiService
          .UrlEndByEventUser(this.myEvent, this.myToken)
          .subscribe(
            (response) => {
              this.errorService.codeHtml = response.codeHtml;
              goToUrl = response.redirect;
            },
            (error) => {},
            () => {
              if (goToUrl) {
                this.processBlocks(b);
              } else {
                this.errorService.errorText = 'Gracias por visitarnos';
                this.router.navigate(['error']);
              }
            }
          );
      } else {
        this.processBlocks(b);
      }
    }
  }

  getSize(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }

  processBlocks(b) {
    let json = {
      session_id: this.session_id,
      step: `event/${this.myEvent}/${this.actualStep}/${
        b[this.actualStep].type
      }`,
      event_id: this.myEvent,
      status: 0,
    };
    this._apiService.saveSession(json, this.myToken).subscribe(
      (response: any) => {
        this.session_id = response.session_id;
      },
      (error) => {},
      () => {
        if (b[this.actualStep].type == 'url-end') {
          let json = {
            session_id: this.session_id,
            step: `event/${this.myEvent}/${this.actualStep}/${
              b[this.actualStep].type
            }`,
            event_id: this.myEvent,
            status: 1,
          };
          this._apiService.saveSession(json, this.myToken).subscribe(
            (response: any) => {
              this.session_id = response.session_id;
            },
            (error) => {},
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

          let size = this.getSize(b[this.actualStep].config);

          if (size < 1) {
            this.actions({ name: 'NEXT' });
          }
        }
      }
    );
  }
}
