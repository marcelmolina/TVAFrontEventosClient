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
  isTablet: boolean = false;
  isWeb: boolean = false;
  multiVote: boolean = true;
  flexDynamic: any;
  candidate: Candidate;

  constructor() {
    if (window.innerWidth <= 768) {
      this.isMobile = true;
    }

    if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      this.isTablet = true;
    }

    if (window.innerWidth > 1024) {
      this.isWeb = true;
    }
  }
  @Output() action = new EventEmitter<any>();
  ngOnInit(): void {
    for (let index = 0; index < this.block.config.candidate.length; index++) {
      const element = this.block.config.candidate[index];
      this.candidate = new Candidate();
      this.candidate.count = 0;
      this.candidate.id = element.candidate_id;
      this.candidate.name = element.name;

      if (this.isMobile) {
        this.candidate.img = element.img_mobile;
      }

      if (this.isTablet) {
        this.candidate.img = element.img_tablet;
      }

      if (this.isWeb) {
        this.candidate.img = element.img_desktop;
      }

      this.arrayCandidates.push(this.candidate);
    }

    this.arrayCandidates.push(this.arrayCandidates[0]);
    this.arrayCandidates.push(this.arrayCandidates[1]);
    this.arrayCandidates.push(this.arrayCandidates[0]);
    this.arrayCandidates.push(this.arrayCandidates[1]);
    this.arrayCandidates.push(this.arrayCandidates[0]);
    this.arrayCandidates.push(this.arrayCandidates[1]);
    this.arrayCandidates.push(this.arrayCandidates[0]);
    this.arrayCandidates.push(this.arrayCandidates[1]);

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
          this.flexDynamic = 'flex:0 0 20%;';
          break;
        case 3:
          this.flexDynamic = 'flex:0 0 18%;';
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
          this.flexDynamic = 'flex: 0 0 20%;';
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
