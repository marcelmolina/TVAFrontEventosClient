import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {



  actualQuestion: number;
  questions: Array<any>
  constructor() {
    this.actualQuestion = 0;
    this.questions = [
      {
        type: 'radio',
        icon: 'far fa-check-circle',
        label: '',
        label2: 'Selección simple',
        description: '',
        required: true,
        active: true,
        descriptionActive: false,
        lastAdded: false,
        otro: true,
        values: [
          {
            label: '',
            label2: 'Opción 1'
          },
          {
            label: '',
            label2: 'Opción 2'
          }
        ]
      },
      {
        type: 'checkbox',
        lastAdded: false,
        required: true,
        descriptionActive: false,
        label: '',
        label2: 'Selección múltiple',
        icon: 'far fa-check-square',
        active: true,
        description: '',
        inline: true,
        otro: false,
        min: 2,
        max: 2,
        values: [
          {
            label: '',
            label2: 'Opción 1'
          },
          {
            label: '',
            label2: 'Opción 2'
          }
        ]
      },
      {
        type: 'autocomplete',
        icon: 'far fa-caret-square-down',
        label: '',
        label2: 'Lista desplegable',
        required: true,
        descriptionActive: false,
        active: true,
        otro: false,
        description: '',
        placeholder: 'Select',
        className: 'form-control',
        values: [
          {
            label: '',
            label2: 'Opción 1'
          },
          {
            label: '',
            label2: 'Opción 2'
          }
        ]
      },
      {
        type: 'text',
        icon: 'fas fa-align-center',
        label: '',
        label2: 'Texto',
        required: true,
        descriptionActive: false,
        active: true,
        description: '',
        placeholder: '',
        className: 'form-control',
        subtype: 'text',
        regex: '',
        handle: true
      },
      {
        type: 'email',
        icon: 'far fa-envelope',
        required: true,
        active: true,
        descriptionActive: false,
        label: '',
        label2: 'Email',
        description: '',
        placeholder: '',
        className: 'form-control',
        subtype: 'text',
        regex: '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$',
        errorText: 'Please enter a valid email',
        handle: true
      },
      {
        type: 'number',
        label: '',
        label2: 'Numérico',
        icon: 'fas fa-hashtag',
        description: '',
        required: true,
        active: true,
        descriptionActive: false,
        placeholder: '',
        className: 'form-control',
        value: '20',
        min: 1,
        max: 1
      },
      {
        type: 'date',
        icon: 'far fa-calendar-alt',
        label: '',
        label2: 'Fechas',
        required: true,
        active: true,
        descriptionActive: false,
        placeholder: '',
        className: 'form-control',
        dateStart: new Date(),
        dateEnd: ''
      },
      {
        type: 'textarea',
        required: true,
        descriptionActive: false,
        active: true,
        icon: 'fas fa-align-right',
        label: '',
        label2: 'Párrafo',
        min: 0,
        max: null
      }
    ]
  }

  ngOnInit(): void {
  }

  onSubmit(form) {

  }
  next() {
    if (this.actualQuestion < this.questions.length - 1) {
      this.actualQuestion++;
    }

  }
}
