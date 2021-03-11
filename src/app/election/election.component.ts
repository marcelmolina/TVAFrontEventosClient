import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  constructor() { }
  @Output() action = new EventEmitter<any>();
  ngOnInit(): void {
  }
  next() {
    this.action.emit(
      {
        name: 'NEXT'
      }
    )
  }

}
