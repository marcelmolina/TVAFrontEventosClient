import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Answer } from './answer.model';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
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
  @Output() action = new EventEmitter<any>();
  constructor() {
    this.activeCheck = [];
    this.actualQuestion = 0;
    this.questions = [];
    this.answer = {
      label: '',
      value: ''
    };
    this.contCheck = 0;
    this.marginCristal = 'margin: 0 25%';
  }

  ngOnInit(): void {
    if (this.block) {
      this.loadQuestions(this.block.questions);

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

      this.rateControl = new FormControl('', [
        Validators.max(this.questions[this.actualQuestion].max),
        Validators.min(this.questions[this.actualQuestion].min)
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

    for (const property in suveryForm.value) {
      if (this.questions[positionQuestion].type == 'checkbox') {
        let check = suveryForm.form.controls[property].value;

        if (property != 'otro') {
          if (check) {
            values.push({
              label: property,
              value: check
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
              value: suveryForm.value[property]
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
        values: valueNormal
      };
    } else {
      answer = {
        type: type,
        values: values
      };
    }

    this.action.emit({
      name: 'SAVE_QUESTION',
      data: answer,
      positionQuestion: positionQuestion
    });
    this.action.emit({
      name: 'SESSION_1',
      type: 'surveys',
      step: this.actualQuestion
    });
    this.answer.value = '';
    if (this.actualQuestion < this.questions.length - 1) {
      this.actualQuestion++;
      console.log(suveryForm);
      suveryForm.resetForm();
      if (
        this.questions[this.actualQuestion].otro &&
        this.questions[this.actualQuestion].type == 'checkbox'
      ) {
        this.activeCheck.push(false);
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
        step: this.actualQuestion
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
        name: 'NEXT'
      });
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

    if (event.control.value == true) {
      this.contCheck++;
    } else {
      this.contCheck--;
    }
  }
  onChangeNumber(event) {
    let rateControl = new FormControl('', [
      Validators.max(this.questions[this.actualQuestion].max),
      Validators.min(this.questions[this.actualQuestion].min)
    ]);

    if (
      event.form.value.number < this.minNumber ||
      (event.form.value.number > this.maxNumber &&
        this.questions[this.actualQuestion].required)
    ) {
      event.form.status = 'INVALID';
    }
  }
  onChangeDate(event) {
    if (
      event.form.value.date < this.minDate ||
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
      radio.checked = false;

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
    if (event.control.value != '') {
      event.control.value = !event.control.value;
      this.activeCheck[o] = !this.activeCheck[o];
    } else {
      event.control.value = true;
      this.activeCheck[o] = !this.activeCheck[o];
    }
    this.onChangeCheck(event, suveryForm);
  }
  checkOtro(valor) {
    console.log(valor);

    if (valor == 'otro') {
      this.otroActive = !this.otroActive;
    }
  }

  onChange(result: any): void {
    this.fechaTouched = true;

    let dateSelected = new Date(result + 'T00:00:00');

    let ini = new Date(
      this.questions[this.actualQuestion].dateStart.split('T')[0] + 'T00:00:00'
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
