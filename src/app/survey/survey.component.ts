import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Answer } from './answer.model';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  @Input() block: any;
  @Input() backgroundProperty: any;
  actualQuestion: number;
  questions: Array<any>;
  minCheck: any;
  maxCheck: any;
  minNumber: any;
  maxNumber: any;
  minDate: any;
  maxDate: any;
  contCheck: number;
  activeRadio: any;
  activeCheck: any;
  rateControl: any;
  answer: Answer;
  marginCristal: any;
  otroActive = false;
  otroSelect: string;
  otroAutoValue: string;
  date: any;
  fechaValida = false;
  fechaTouched = false;
  msgErrorFechas: any;
  validateAnswer: boolean;
  mensajeError: boolean;
  @Output() action = new EventEmitter<any>();
  constructor() {
    this.validateAnswer = false;
    this.activeCheck = [];
    this.actualQuestion = 0;
    this.questions = [];
    this.answer = {
      label: '',
      value: '',
    };
    this.contCheck = 0;
    this.marginCristal = 'margin: 0 25%';
    this.mensajeError = false;
  }

  ngOnInit(): void {
    if (this.block) {
      this.loadQuestions(this.block.questions);
      this.sizeCristal();

      this.rateControl = new FormControl('', [
        Validators.max(this.questions[this.actualQuestion].max),
        Validators.min(this.questions[this.actualQuestion].min),
      ]);
    }
  }

  onSubmit(form) {}
  activeOtro(suveryForm) {
    this.otroActive = true;

    console.log(suveryForm);
  }
  cambioRadio() {
    console.log('asdasd');
  }
  next(suveryForm, positionQuestion, type) {
    this.activeRadio = null;
    let answer;
    let values = [];
    this.mensajeError = false;

    for (const property in suveryForm.value) {
      if (this.questions[positionQuestion].type == 'checkbox') {
        let check = suveryForm.form.controls[property].value;

        if (property != 'otro' && property != 'OpcionOtro') {
          if (check) {
            values.push({
              label: property,
              value: property,
            });
          }
        }
        if (property == 'OpcionOtro') {
          if (check) {
            values.push({
              label: 'Otro',
              value: suveryForm.form.controls[property].value,
            });
          }
        }
      } else {
        if (
          this.questions[positionQuestion].type == 'radio' ||
          this.questions[positionQuestion].type == 'autocomplete'
        ) {
          if (property != 'otro') {
            values.push({
              label: property,
              value: suveryForm.value[property],
            });
          }
          if (this.questions[positionQuestion].type == 'autocomplete') {
            values[0].value = this.otroAutoValue;
          }
        }
      }
    }

    if (
      this.questions[positionQuestion].type != 'checkbox' &&
      this.questions[positionQuestion].type != 'autocomplete' &&
      this.questions[positionQuestion].type != 'radio'
    ) {
      let valueNormal = this.answer.value;
      answer = {
        type: type,
        values: valueNormal,
      };
    } else {
      answer = {
        type: type,
        values: values,
      };
    }
    if (this.questions[positionQuestion].required) {
      this.validateAnswer = true;
    } else {
      switch (this.questions[positionQuestion].type) {
        case 'checkbox':
          this.validateAnswer = this.validateCheck(
            this.questions[positionQuestion],
            answer
          );

          break;

        case 'date':
          this.validateAnswer = this.validateDate(
            this.questions[positionQuestion],
            answer
          );
          console.log(this.validateAnswer);

          break;
        case 'number':
          this.validateAnswer = this.validateNumber(
            this.questions[positionQuestion],
            answer
          );

          break;
        case 'textarea':
          this.validateAnswer = this.validateTextArea(
            this.questions[positionQuestion],
            answer
          );

          break;

        default:
          this.validateAnswer = true;
          break;
      }
    }

    if (this.validateAnswer) {
      this.action.emit({
        name: 'SAVE_QUESTION',
        data: answer,
        positionQuestion: positionQuestion,
      });
      this.action.emit({
        name: 'SESSION_1',
        type: 'surveys',
        step: this.actualQuestion,
      });

      this.answer.value = '';
      if (this.actualQuestion < this.questions.length - 1) {
        this.actualQuestion++;
        console.log(suveryForm);
        suveryForm.resetForm();
        this.sizeCristal();

        if (this.questions[this.actualQuestion].type == 'checkbox') {
          this.activeCheck = [];
          this.maxCheck = this.questions[this.actualQuestion].max;
          this.minCheck = this.questions[this.actualQuestion].min;
          for (
            let index = 0;
            index < this.questions[this.actualQuestion].values.length;
            index++
          ) {
            this.activeCheck.push(false);
          }

          if (this.questions[this.actualQuestion].otro) {
            this.activeCheck.push(false);
          }
        }
        if (
          this.questions[this.actualQuestion].type == 'checkbox' ||
          this.questions[this.actualQuestion].type == 'radio'
        ) {
          console.log('opciones');

          let opciones = this.questions[this.actualQuestion].values.length;
          if (this.questions[this.actualQuestion].otro) {
            opciones++;
          }
          if (opciones > 5) {
            console.log('opciones');
            this.marginCristal = 'margin: 0';
          } else {
            this.marginCristal = 'margin: 0 25%';
          }
        }

        this.action.emit({
          name: 'SESSION_0',
          type: 'surveys',
          step: this.actualQuestion,
        });

        if (this.questions[this.actualQuestion].type == 'checkbox') {
          this.maxCheck = this.questions[this.actualQuestion].max;
          this.minCheck = this.questions[this.actualQuestion].min;

          for (
            let index = 0;
            index < this.questions[this.actualQuestion].values.length;
            index++
          ) {
            this.activeCheck.push(false);
          }
        }
        if (this.questions[this.actualQuestion].type == 'number') {
          this.maxNumber = this.questions[this.actualQuestion].max;
          this.minNumber = this.questions[this.actualQuestion].min;
        }
        if (this.questions[this.actualQuestion].type == 'date') {
          this.maxDate = this.questions[this.actualQuestion].dateEnd;
          this.minDate = this.questions[this.actualQuestion].dateStart;
        }
      } else {
        this.action.emit({
          name: 'NEXT',
        });
      }
    }
  }
  loadQuestions(blocks) {
    for (let index = 0; index < blocks.length; index++) {
      this.questions.push(blocks[index].question);
    }
    if (this.questions[this.actualQuestion].type == 'checkbox') {
      this.maxCheck = this.questions[this.actualQuestion].max;
      this.minCheck = this.questions[this.actualQuestion].min;
      for (
        let index = 0;
        index < this.questions[this.actualQuestion].values.length;
        index++
      ) {
        this.activeCheck.push(false);
      }

      if (this.questions[this.actualQuestion].otro) {
        this.activeCheck.push(false);
      }
    }

    if (this.questions[this.actualQuestion].type == 'number') {
      this.maxNumber = this.questions[this.actualQuestion].max;
      this.minNumber = this.questions[this.actualQuestion].min;
    }
    if (this.questions[this.actualQuestion].type == 'date') {
      this.maxDate = this.questions[this.actualQuestion].dateEnd;
      this.minDate = this.questions[this.actualQuestion].dateStart;
    }
  }
  onChangeCheck(event, suveryForm) {
    console.log(event);

    if (event == true) {
      this.contCheck++;
    } else {
      this.contCheck--;
    }
    console.log(this.contCheck);
  }
  onChangeNumber(event) {
    let rateControl = new FormControl('', [
      Validators.max(this.questions[this.actualQuestion].max),
      Validators.min(this.questions[this.actualQuestion].min),
    ]);

    if (
      (event.form.value.number < this.minNumber &&
        this.questions[this.actualQuestion].required) ||
      (event.form.value.number > this.maxNumber &&
        this.questions[this.actualQuestion].required)
    ) {
      event.form.status = 'INVALID';
    }
  }
  onChangeDate(event) {
    if (
      (event.form.value.date < this.minDate &&
        this.questions[this.actualQuestion].required) ||
      (event.form.value.date > this.maxDate &&
        this.questions[this.actualQuestion].required)
    ) {
      event.form.status = 'INVALID';
    }
  }
  clickRadio(q) {
    if (q == 9999) {
      this.otroActive = true;
    } else {
      this.otroActive = false;
    }

    this.activeRadio = q;
    let radio: any;

    if (q != 9999) {
      for (
        let index = 0;
        index < this.questions[this.actualQuestion].values.length;
        index++
      ) {
        radio = document.getElementById(
          'radio-option-' + (index + 1) + '-' + this.actualQuestion
        );
        radio.checked = false;
      }
      radio = document.getElementById('radio-option-otro');
      if (radio) {
        radio.checked = false;
      }

      radio = document.getElementById(
        'radio-option-' + (q + 1) + '-' + this.actualQuestion
      );
      radio.checked = true;
      this.answer.value = 'radio-option-' + (q + 1) + '-' + this.actualQuestion;
    } else {
      for (
        let index = 0;
        index < this.questions[this.actualQuestion].values.length;
        index++
      ) {
        radio = document.getElementById(
          'radio-option-' + (index + 1) + '-' + this.actualQuestion
        );
        radio.checked = false;
      }

      radio = document.getElementById('radio-option-otro');
      radio.checked = true;
      this.answer.value = '';
      console.log(this.answer);
    }
  }
  clickCheck(event, o, suveryForm) {
    this.activeCheck[o] = !this.activeCheck[o];

    if (event.control.value != '') {
      event.control.value = !event.control.value;
    } else {
      event.control.value = true;
    }
    this.onChangeCheck(this.activeCheck[o], suveryForm);
  }
  checkOtro(valor) {
    console.log(valor);

    if (valor == 'otro') {
      this.otroActive = !this.otroActive;
    } else {
      this.otroActive = false;
    }
  }

  onChange(result: any): void {
    this.fechaTouched = true;

    if (result) {
      let dateSelected = new Date(result + 'T00:00:00');

      let ini = new Date(
        this.questions[this.actualQuestion].dateStart.split('T')[0] +
          'T00:00:00'
      );
      let end = new Date(
        this.questions[this.actualQuestion].dateEnd.split('T')[0] + 'T00:00:00'
      );

      if (dateSelected <= end && dateSelected >= ini) {
        this.fechaValida = true;
        this.answer.value = dateSelected;
      } else {
        this.fechaValida = false;
        this.answer.value = '';
        this.msgErrorFechas = 'Fecha inválida';
      }
    }
  }

  validateCheck(question, Answer) {
    if (Answer.values.length > 0) {
      if (
        Answer.values.length < question.min ||
        Answer.values.length > question.max
      ) {
        this.mensajeError = true;
        return false;
      } else {
        this.mensajeError = false;
        return true;
      }
    } else {
      return true;
    }
  }

  validateNumber(question, Answer) {
    if (Answer.values != null) {
      if (Answer.values < question.min || Answer.values > question.max) {
        this.mensajeError = true;
        return false;
      } else {
        this.mensajeError = false;
        return true;
      }
    } else {
      return true;
    }
  }
  validateDate(question, Answer) {
    if (this.date != undefined && this.date != null) {
      if (
        this.date < new Date(question.dateStart) ||
        this.date > new Date(question.dateEnd)
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  validateTextArea(question, Answer) {
    if (Answer.values.length > 0) {
      if (
        Answer.values.length < question.min ||
        Answer.values.length > question.max
      ) {
        this.mensajeError = true;

        return false;
      } else {
        this.mensajeError = false;

        return true;
      }
    } else {
      this.mensajeError = false;
      return true;
    }
  }

  sizeCristal() {
    if (
      this.questions[this.actualQuestion].type == 'checkbox' ||
      this.questions[this.actualQuestion].type == 'radio'
    ) {
      console.log('opciones');
      let opciones = this.questions[this.actualQuestion].values.length;
      if (this.questions[this.actualQuestion].otro) {
        opciones++;
      }
      if (opciones > 5) {
        console.log('opciones');
        this.marginCristal = 'margin: 0';
      } else {
        this.marginCristal = 'margin: 0 25%';
      }
    } else {
      this.marginCristal = 'margin: 0';
    }
  }
}
