import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  constructor() {}
  @Output() action = new EventEmitter<any>();

  @Input() block: any;

  ngOnInit(): void {
    console.log(this.block);
  }
  next() {
    this.action.emit({
      name: 'NEXT'
    });
  }
}
