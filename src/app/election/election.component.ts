import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {
  @Input() block: any;
  arrayCandidates: any = [1, 2, 3, 4];

  flexDynamic: any;

  constructor() {}
  @Output() action = new EventEmitter<any>();
  ngOnInit(): void {
    switch (this.arrayCandidates.length) {
      case 2:
        this.flexDynamic = 'flex:0 0 25%;';
        break;
      case 3:
        this.flexDynamic = 'flex:0 0 20%;';
        break;
      case 4:
        this.flexDynamic = 'flex:0 0 15%;';
        break;
      default:
        this.flexDynamic = 'flex:0 0 15%;';
        break;
    }

    // console.log(this.block);
    // this.arrayCandidates = this.block.config.candidate;
    // console.log(this.arrayCandidates);
  }
  next() {
    this.action.emit({
      name: 'NEXT'
    });
  }
}
