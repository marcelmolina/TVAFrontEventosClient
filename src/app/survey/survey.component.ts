import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  answer: Answer;
  @Output() action = new EventEmitter<any>();
  constructor() {
    this.actualQuestion = 0;
    this.questions = [

    ];
    this.answer = {
      label: '',
      value: ''
    };
  }

  ngOnInit(): void {

    if (this.block) {

      this.loadQuestions(this.block.questions);
    }

  }

  onSubmit(form) {

  }

  next(suveryForm, positionQuestion, type) {
    let answer;
    let values = [];
    console.log(suveryForm);

    console.log(suveryForm.value);
    for (const property in suveryForm.value) {
      if (this.questions[positionQuestion].type == 'checkbox') {
        if (suveryForm.value[property] == true) {
          values.push(
            {
              label: property,
              value: suveryForm.value[property]
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
    } else {
      answer = {
        type: type,
        values: values
      }
    }


    console.log(answer);

    this.action.emit(
      {
        name: 'SAVE_QUESTION',
        data: answer,
        positionQuestion: positionQuestion
      }
    )
    this.answer.value = '';
    if (this.actualQuestion < this.questions.length - 1) {
      this.actualQuestion++;
    }

  }
  loadQuestions(blocks) {
    for (let index = 0; index < blocks.length; index++) {
      this.questions.push(blocks[index].question);
    }
  }
}

