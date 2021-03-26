import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {
  @Input() block: any;
  arrayCandidatos: any = [{ url: '' }];

  constructor() {}
  @Output() action = new EventEmitter<any>();
  ngOnInit(): void {
    console.log(this.block);
    this.arrayCandidatos = this.block.config.candidate;
    console.log(this.arrayCandidatos);
  }
  next() {
    this.action.emit({
      name: 'NEXT'
    });
  }
}
