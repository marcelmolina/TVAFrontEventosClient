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
    // let response = {
    //   backgrounds: {
    //     img_tablet: '',
    //     img_mobile: '',
    //     img_desktop: ''
    //   },
    //   dates: {
    //     start: '2021-03-08T11:50',
    //     end: '2021-03-26T23:50'
    //   },
    //   description: '',
    //   events_id: '986576a3-8754-47ff-92e6-888837ad54d6',
    //   name_event: 'Los Latinos',
    //   program: {
    //     name_program: 'La Voz',
    //     updated_at: 4545454,
    //     description_program: 'Unete',
    //     program_id: '1'
    //   },
    //   blocks: [
    //     {
    //       name: 'Encuesta',
    //       icon: 'fas fa-check-circle',
    //       position: {
    //         p: -1,
    //         n: 1
    //       },
    //       type: 'surveys',
    //       config: {
    //         description_qp: '14 de febrero',
    //         name_qp: 'Domingo',
    //         question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //         keyword_object_id: 'survey#1',
    //         cant_question: '10'
    //       },
    //       enable: true,
    //       questions: [
    //         {
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           updated_at: 1613323773282,
    //           question_id: '298da3e0-0a52-4a22-ad65-abe326a5ed87',
    //           question: {
    //             values: [
    //               {
    //                 label2: 'Opción 1',
    //                 label: 'orquideas'
    //               },
    //               {
    //                 label2: 'Opción 2',
    //                 label: 'girasoles'
    //               },
    //               {
    //                 label2: 'Opción',
    //                 label: 'otro'
    //               }
    //             ],
    //             icon: 'far fa-check-circle',
    //             indiceAux: 0,
    //             description: '',
    //             active: true,
    //             label: 'flores',
    //             type: 'radio',
    //             label2: 'Selección simple',
    //             required: true,
    //             otro: false,
    //             lastAdded: false,
    //             name: 'radio-1613323755536',
    //             canDelete: true,
    //             descriptionActive: false
    //           },
    //           position_qp: {
    //             n: '0cb7b5ff-1e97-49bb-9acb-f7578e0e0d72',
    //             p: '177d35a4-7ae7-4829-8068-e7a8de1eec5f'
    //           }
    //         },
    //         {
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           updated_at: 1613323815646,
    //           question_id: '0cb7b5ff-1e97-49bb-9acb-f7578e0e0d72',
    //           question: {
    //             max: 2,
    //             values: [
    //               {
    //                 label2: 'Opción 1',
    //                 label: 'az'
    //               },
    //               {
    //                 label2: 'Opción 2',
    //                 label: 'ae'
    //               }
    //             ],
    //             icon: 'far fa-check-square',
    //             indiceAux: 1,
    //             active: true,
    //             description: '',
    //             label: 'mariposas',
    //             type: 'checkbox',
    //             required: true,
    //             label2: 'Selección múltiple',
    //             min: 2,
    //             inline: true,
    //             otro: false,
    //             lastAdded: false,
    //             name: 'checkbox-1613323806134',
    //             canDelete: true,
    //             id_qpool: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //             descriptionActive: false
    //           },
    //           is_enabled: true,
    //           position_qp: {
    //             n: '4f605e23-352f-4fb6-8d0a-35e4699c164d',
    //             p: '298da3e0-0a52-4a22-ad65-abe326a5ed87'
    //           }
    //         },
    //         {
    //           updated_at: 1613701631819,
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           question_id: '4f605e23-352f-4fb6-8d0a-35e4699c164d',
    //           question: {
    //             max: 1,
    //             icon: 'fas fa-hashtag',
    //             indiceAux: 3,
    //             description: '',
    //             active: true,
    //             className: 'form-control',
    //             label: 'colores',
    //             type: 'number',
    //             label2: 'Numérico',
    //             required: true,
    //             min: 1,
    //             name: 'number-1613701626711',
    //             canDelete: true,
    //             id_qpool: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //             placeholder: '',
    //             descriptionActive: false,
    //             value: '20'
    //           },
    //           is_enabled: true,
    //           position_qp: {
    //             p: '0cb7b5ff-1e97-49bb-9acb-f7578e0e0d72',
    //             n: 'f5ba6992-9e3a-45a0-9503-d4e755af4331'
    //           }
    //         },
    //         {
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           updated_at: 1613323943813,
    //           question_id: 'f5ba6992-9e3a-45a0-9503-d4e755af4331',
    //           question: {
    //             icon: 'fas fa-align-center',
    //             indiceAux: 3,
    //             active: true,
    //             description: '',
    //             className: 'form-control',
    //             handle: true,
    //             label: 'Prueba01',
    //             type: 'text',
    //             label2: 'Texto',
    //             required: true,
    //             regex: '',
    //             subtype: 'text',
    //             name: 'text-1613323938075',
    //             canDelete: true,
    //             id_qpool: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //             placeholder: 'ASASA',
    //             descriptionActive: false
    //           },
    //           is_enabled: true,
    //           position_qp: {
    //             n: '69c53674-fcea-4512-beea-0b7bbc209c67',
    //             p: '4f605e23-352f-4fb6-8d0a-35e4699c164d'
    //           }
    //         },
    //         {
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           updated_at: 1613324074145,
    //           question_id: '69c53674-fcea-4512-beea-0b7bbc209c67',
    //           question: {
    //             icon: 'far fa-envelope',
    //             indiceAux: 4,
    //             active: true,
    //             description: '',
    //             className: 'form-control',
    //             handle: true,
    //             label: 'prueba02',
    //             type: 'email',
    //             required: true,
    //             label2: 'Email',
    //             id_question: '69c53674-fcea-4512-beea-0b7bbc209c67',
    //             errorText: 'Please enter a valid email',
    //             regex: '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$',
    //             subtype: 'text',
    //             name: 'email-1613324052268',
    //             lastAdded: false,
    //             canDelete: true,
    //             id_qpool: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //             placeholder: '',
    //             descriptionActive: false
    //           },
    //           is_enabled: true,
    //           position_qp: {
    //             p: 'f5ba6992-9e3a-45a0-9503-d4e755af4331',
    //             n: '54e34614-0f35-4dc9-982d-2f319683a26a'
    //           }
    //         },
    //         {
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           updated_at: 1613324018236,
    //           question_id: '54e34614-0f35-4dc9-982d-2f319683a26a',
    //           question: {
    //             max: 11,
    //             icon: 'fas fa-hashtag',
    //             indiceAux: 4,
    //             description: '',
    //             active: true,
    //             className: 'form-control',
    //             label: 'a',
    //             type: 'number',
    //             label2: 'Numérico',
    //             required: true,
    //             min: 11,
    //             name: 'number-1613324004355',
    //             canDelete: true,
    //             id_qpool: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //             placeholder: '',
    //             descriptionActive: false,
    //             value: '20'
    //           },
    //           is_enabled: true,
    //           position_qp: {
    //             n: '342ac9c9-0a4a-416d-9a19-36b2728d0e95',
    //             p: '69c53674-fcea-4512-beea-0b7bbc209c67'
    //           }
    //         },
    //         {
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           updated_at: 1613324079386,
    //           question_id: '342ac9c9-0a4a-416d-9a19-36b2728d0e95',
    //           question: {
    //             icon: 'far fa-calendar-alt',
    //             indiceAux: 19,
    //             active: true,
    //             className: 'form-control',
    //             label: 'cumpleaños',
    //             dateEnd: '2021-02-15',
    //             type: 'date',
    //             label2: 'Fechas',
    //             required: true,
    //             id_question: '0ed26e7b-6182-45d0-b31a-ea69becc5bb0',
    //             dateStart: '2021-02-15',
    //             name: 'date-1613324029414',
    //             lastAdded: false,
    //             canDelete: true,
    //             id_qpool: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //             placeholder: '',
    //             descriptionActive: true
    //           },
    //           is_enabled: true,
    //           position_qp: {
    //             n: '36cc2b56-1909-465e-a300-37eb3a36dc12',
    //             p: '54e34614-0f35-4dc9-982d-2f319683a26a'
    //           }
    //         },
    //         {
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           updated_at: 1613436779354,
    //           question_id: '36cc2b56-1909-465e-a300-37eb3a36dc12',
    //           question: {
    //             icon: 'far fa-envelope',
    //             indiceAux: 4,
    //             active: true,
    //             description: '',
    //             className: 'form-control',
    //             handle: true,
    //             label: 'colores',
    //             type: 'email',
    //             required: true,
    //             label2: 'Email',
    //             errorText: 'Please enter a valid email',
    //             regex: '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$',
    //             subtype: 'text',
    //             name: 'email-1613323947034',
    //             canDelete: true,
    //             id_qpool: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //             placeholder: 'sd',
    //             descriptionActive: false
    //           },
    //           is_enabled: false,
    //           position_qp: {
    //             n: '0ed26e7b-6182-45d0-b31a-ea69becc5bb0',
    //             p: '342ac9c9-0a4a-416d-9a19-36b2728d0e95'
    //           }
    //         },
    //         {
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           updated_at: 1613436772232,
    //           question_id: '0ed26e7b-6182-45d0-b31a-ea69becc5bb0',
    //           question: {
    //             icon: 'far fa-calendar-alt',
    //             indiceAux: 6,
    //             active: true,
    //             className: 'form-control',
    //             label: 'cumpleaños',
    //             dateEnd: '2021-02-15',
    //             type: 'date',
    //             label2: 'Fechas',
    //             required: true,
    //             id_question: '0ed26e7b-6182-45d0-b31a-ea69becc5bb0',
    //             dateStart: '2021-02-15',
    //             name: 'date-1613324029414',
    //             lastAdded: false,
    //             canDelete: true,
    //             id_qpool: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //             placeholder: '',
    //             descriptionActive: true
    //           },
    //           is_enabled: true,
    //           position_qp: {
    //             n: '9f340684-cff6-47f4-99a1-52353db5eb46',
    //             p: '36cc2b56-1909-465e-a300-37eb3a36dc12'
    //           }
    //         },
    //         {
    //           question_pools_id: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //           updated_at: 1613436765624,
    //           question_id: '9f340684-cff6-47f4-99a1-52353db5eb46',
    //           question: {
    //             icon: 'far fa-calendar-alt',
    //             indiceAux: 21,
    //             active: true,
    //             className: 'form-control',
    //             label: 'cumpleaños',
    //             dateEnd: '2021-02-15',
    //             type: 'date',
    //             label2: 'Fechas',
    //             required: true,
    //             id_question: '0ed26e7b-6182-45d0-b31a-ea69becc5bb0',
    //             dateStart: '2021-02-15',
    //             name: 'date-1613324029414',
    //             lastAdded: false,
    //             canDelete: true,
    //             id_qpool: '7f303888-61a6-4173-a002-1730cbaa8b18',
    //             placeholder: '',
    //             descriptionActive: true
    //           },
    //           is_enabled: true,
    //           position_qp: {
    //             n: 'e92865d5-cd37-4945-8a84-573ca834d647',
    //             p: '0ed26e7b-6182-45d0-b31a-ea69becc5bb0'
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       enable: false,
    //       name: 'Votación',
    //       icon: 'fas fa-hand-pointer',
    //       position: {
    //         p: 0,
    //         n: 2
    //       },
    //       type: 'elections',
    //       config: {},
    //       showResult: true
    //     },
    //     {
    //       name: 'Resultados',
    //       icon: 'fas fa-chart-line',
    //       position: {
    //         p: 1,
    //         n: 3
    //       },
    //       type: 'results',
    //       config: {},
    //       enable: false
    //     },
    //     {
    //       name: 'Video',
    //       icon: 'fas fa-video',
    //       position: {
    //         p: 2,
    //         n: 4
    //       },
    //       type: 'video',
    //       config: {
    //         url_video: 'https://www.youtube.com/watch?v=wLzzuKK-YtI',
    //         description_video: '',
    //         title_video: ''
    //       },
    //       enable: true
    //     },
    //     {
    //       name: 'Url Destino',
    //       icon: 'fas fa-globe-americas',
    //       position: {
    //         p: 3,
    //         n: null
    //       },
    //       type: 'url-end',
    //       config: {
    //         destination_url: 'https://www.google.com/'
    //       },
    //       enable: false
    //     }
    //   ],
    //   status: true
    // };
    // this.question.event_id = response.events_id;
    // this.blocks = response.blocks;
    // this.totalSteps = this.blocks.length;

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
          // window.location.href = AppConstants.loginURL;
        }

        var token = objetoTVA.token;
        this.myToken = token;
        var id = objetoTVA.eventID;
        var cookieID = objetoTVA.cookieID;

        this.validateAuth(token, id, cookieID);
      }
    });
  }

  validateAuth(token, id, cookieID) {
    fetch(AppConstants.baseURL + '/validate/token', {
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

              if (b[this.actualStep].type == 'url-end') {
                window.location.href =
                  b[this.actualStep].config.destination_url;
              }
              this.question.event_id = response.events_id;
              this.blocks = response.blocks;
              this.totalSteps = this.blocks.length;
            });
          } else {
            window.location.href = AppConstants.loginURL;
          }
        },
        error => {
          window.location.href = AppConstants.loginURL;
        }
      );
  }

  actions(action) {
    switch (action.name) {
      case 'NEXT':
        this.actualStep++;

        if (this.blocks[this.actualStep].type == 'url-end') {
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
