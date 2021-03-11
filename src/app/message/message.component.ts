import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

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
