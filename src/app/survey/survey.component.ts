import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Answer } from './answer.model'
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {



  @Input() block: any;
  actualQuestion: number;
  questions: Array<any>
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
  @Output() action = new EventEmitter<any>();
  constructor() {
    this.activeCheck = [];
    this.actualQuestion = 0;
    this.questions = [

    ];
    this.answer = {
      label: '',
      value: ''
    };
    this.contCheck = 0;
  }

  ngOnInit(): void {

    if (this.block) {

      this.loadQuestions(this.block.questions);
      this.rateControl = new FormControl("", [Validators.max(this.questions[this.actualQuestion].max), Validators.min(this.questions[this.actualQuestion].min)])
    }

  }

  onSubmit(form) {

  }

  next(suveryForm, positionQuestion, type) {
    this.activeRadio = null;
    let answer;
    let values = [];


    for (const property in suveryForm.value) {
      if (this.questions[positionQuestion].type == 'checkbox') {

        let check = suveryForm.form.controls[property].value;


        if (check) {
          values.push(
            {
              label: property,
              value: check
            }
          )
        }
      } else {
        if (this.questions[positionQuestion].type == 'radio' || this.questions[positionQuestion].type == 'autocomplete') {
          values.push(
            {
              label: property,
              value: suveryForm.value[property]
            }
          )
        }
      }
    }


    if (this.questions[positionQuestion].type != 'checkbox' && this.questions[positionQuestion].type != 'autocomplete' && this.questions[positionQuestion].type != 'radio') {
      let valueNormal = this.answer.value;
      answer = {
        type: type,
        values: valueNormal
      }
      if (this.questions[positionQuestion].type == 'date') {


        valueNormal = new Date(this.answer.value);
        answer = {
          type: type,
          values: valueNormal
        }
      }
    } else {
      answer = {
        type: type,
        values: values
      }
    }


    this.action.emit(
      {
        name: 'SAVE_QUESTION',
        data: answer,
        positionQuestion: positionQuestion
      }
    )
    this.action.emit(
      {
        name: 'SESSION_1',
        type: 'surveys',
        step: this.actualQuestion
      }
    )
    this.answer.value = '';
    if (this.actualQuestion < this.questions.length - 1) {
      this.actualQuestion++;
      this.action.emit(
        {
          name: 'SESSION_0',
          type: 'surveys',
          step: this.actualQuestion
        }
      )

      if (this.questions[this.actualQuestion].type == 'checkbox') {
        this.maxCheck = this.questions[this.actualQuestion].max;
        this.minCheck = this.questions[this.actualQuestion].min;


        for (let index = 0; index < this.questions[this.actualQuestion].values.length; index++) {
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
      this.action.emit(
        {
          name: 'NEXT'
        }
      )
    }

  }
  loadQuestions(blocks) {

    for (let index = 0; index < blocks.length; index++) {
      this.questions.push(blocks[index].question);
    }
    if (this.questions[this.actualQuestion].type == 'checkbox') {
      this.maxCheck = this.questions[this.actualQuestion].max;
      this.minCheck = this.questions[this.actualQuestion].min;
      for (let index = 0; index < this.questions[this.actualQuestion].values.length; index++) {
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


    if (event.control.value == true) {
      this.contCheck++;
    } else {
      this.contCheck--;
    }

  }
  onChangeNumber(event) {
    let rateControl = new FormControl("", [Validators.max(this.questions[this.actualQuestion].max), Validators.min(this.questions[this.actualQuestion].min)])

    if (event.form.value.number < this.minNumber || event.form.value.number > this.maxNumber && this.questions[this.actualQuestion].required) {
      event.form.status = "INVALID";
    }
  }
  onChangeDate(event) {

    if (event.form.value.date < this.minDate || event.form.value.date > this.maxDate && this.questions[this.actualQuestion].required) {
      event.form.status = "INVALID";
    }
  }
  clickRadio(q) {
    this.activeRadio = q;
    let radio: any;
    for (let index = 0; index < this.questions[this.actualQuestion].values.length; index++) {
      radio = document.getElementById("radio-option-" + (index + 1) + "-" + this.actualQuestion);
      radio.checked = false;
    }
    radio = document.getElementById("radio-option-" + (q + 1) + "-" + this.actualQuestion);
    radio.checked = true;
    this.answer.value = "radio-option-" + (q + 1) + "-" + this.actualQuestion;
  }
  clickCheck(event, o, suveryForm) {

    if (event.control.value != "") {
      event.control.value = !event.control.value
      this.activeCheck[o] = !this.activeCheck[o];
    } else {
      event.control.value = true;
      this.activeCheck[o] = !this.activeCheck[o];
    }
    this.onChangeCheck(event, suveryForm);
  }

}

