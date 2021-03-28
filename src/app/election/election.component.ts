import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candidate } from './candidate.model';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {
  @Input() block: any;
  arrayCandidates: any = [];
  isMobile: boolean = false;
  multiVote: boolean = true;
  flexDynamic: any;
  candidate: Candidate;

  constructor() {
    if (window.innerWidth < 769) {
      this.isMobile = true;
    }
  }
  @Output() action = new EventEmitter<any>();
  ngOnInit(): void {
    for (let index = 0; index < this.block.config.candidate.length; index++) {
      const element = this.block.config.candidate[index];
      this.candidate = new Candidate();
      this.candidate.count = 0;
      this.candidate.id = element.candidate_id;
      this.candidate.img_desktop = element.img_desktop;
      this.candidate.img_mobile = element.img_mobile;
      this.candidate.img_tablet = element.img_tablet;

      this.arrayCandidates.push(this.candidate);
    }
    this.refreshLayout();

    console.log(this.arrayCandidates);
    console.log(this.block);
  }
  next() {
    this.action.emit({
      name: 'NEXT'
    });
  }

  switchCandidate(img: any, candidate) {
    console.log(candidate);

    let candidates = document.getElementsByClassName('img-candidate');

    for (let index = 0; index < candidates.length; index++) {
      const element = candidates[index];
      element.classList.remove('active');
    }

    img.classList.add('active');
  }

  refreshLayout() {
    if (!this.isMobile) {
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
        case 5:
          this.flexDynamic = 'flex: 0 0 25%;';
          break;
        case 6:
          this.flexDynamic = 'flex: 0 0 25%;';
          break;
        default:
          this.flexDynamic = 'flex: 0 0 15%;';
          break;
      }
    } else {
      switch (this.arrayCandidates.length) {
        case 2:
          this.flexDynamic = 'flex:0 0 100%;';
          break;
        default:
          this.flexDynamic = 'flex: 0 0 50%;';
          break;
      }
    }
  }

  minus(candidate) {
    if (candidate.count > 0) candidate.count--;
  }

  add(candidate) {
    candidate.count++;
  }
}
