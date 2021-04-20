import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candidate } from './candidate.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {
  @Input() block: any;
  @Input() backgroundProperty: any;
  @Output() action = new EventEmitter<any>();

  arrayCandidates: any = [];
  isMobile: boolean = false;
  isTablet: boolean = false;
  isWeb: boolean = false;
  multiVote: boolean = false;
  flexDynamic: any;
  candidate: Candidate;

  votesTotal: number;
  frecuencyHours: number;
  frecuencyMinutes: number;
  votesAllowed: number;

  candidatesSelected: any = [];
  canVote: boolean = false;
  isSending: boolean = false;

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

  ngOnInit(): void {
    for (let index = 0; index < this.block.config.candidate.length; index++) {
      const element = this.block.config.candidate[index];
      this.candidate = new Candidate();
      this.candidate.amount_assign = 0;
      this.candidate.candidate_id = element.candidate_id;
      this.candidate.name = element.name;
      this.candidate.img_desktop = element.img_desktop;
      this.candidate.img_mobile = element.img_mobile;
      this.candidate.img_tablet = element.img_tablet;

      if (this.isMobile) {
        this.candidate.img = element.img_mobile.split('?')[0];
      }

      if (this.isTablet) {
        this.candidate.img = element.img_tablet.split('?')[0];
      }

      if (this.isWeb) {
        this.candidate.img = element.img_desktop.split('?')[0];
      }

      this.arrayCandidates.push(this.candidate);
    }

    // this.arrayCandidates = this.arrayCandidates.slice(1, 9);

    this.refreshLayout();

    this.votesTotal = this.block.config.number_votes;
    this.votesAllowed = this.block.config.number_votes_allowed;
    this.frecuencyHours = this.block.config.frequency_hours;
    this.frecuencyMinutes = this.block.config.frequency_minutes;

    if (this.block.config.number_votes > 1) this.multiVote = true;
    else this.multiVote = false;
  }

  next() {
    this.action.emit({
      name: 'NEXT'
    });
  }

  switchCandidate(img: any, candidate) {
    let candidates = document.getElementsByClassName('img-candidate');

    for (let index = 0; index < candidates.length; index++) {
      const element = candidates[index];
      element.classList.remove('active');
    }

    img.classList.add('active');

    if (!this.multiVote) {
      this.candidatesSelected[0] = candidate;
      this.canVote = true;
    }
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
    if (candidate.amount_assign > 0) {
      candidate.amount_assign--;
      this.votesTotal++;
    }

    if (this.votesTotal < this.block.config.number_votes) this.canVote = true;
    else this.canVote = false;
  }

  add(candidate) {
    if (this.votesTotal > 0) {
      candidate.amount_assign++;
      this.votesTotal--;
    }

    if (this.votesTotal < this.block.config.number_votes) this.canVote = true;
    else this.canVote = false;
  }

  votar() {
    this.isSending = true;
    if (!this.multiVote) {
      this.candidatesSelected[0].amount_assign++;

      swal
        .fire({
          title: '¿Estas seguro?',
          text: 'Se va a realizar la votación',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#332255',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, votar',
          cancelButtonText: 'Cancelar'
        })
        .then(result => {
          if (result.isConfirmed) {
            this.action.emit({
              name: 'SAVE_ELECTION',
              data: this.candidatesSelected
            });
          } else {
            this.isSending = false;
            this.candidatesSelected[0].amount_assign = 0;
          }
        });
    }

    if (this.multiVote) {
      if (this.votesTotal > 0) {
        swal
          .fire({
            title: '¿Estas seguro?',
            text: 'Te quedan votos disponibles',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#332255',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, votar',
            cancelButtonText: 'Cancelar'
          })
          .then(result => {
            if (result.isConfirmed) {
              this.action.emit({
                name: 'SAVE_ELECTION',
                data: this.arrayCandidates
              });
            } else this.isSending = false;
          });
      } else {
        swal
          .fire({
            title: '¿Estas seguro?',
            text: 'Se va a realizar la votación',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#332255',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, votar',
            cancelButtonText: 'Cancelar'
          })
          .then(result => {
            if (result.isConfirmed) {
              this.action.emit({
                name: 'SAVE_ELECTION',
                data: this.arrayCandidates
              });
            } else this.isSending = false;
          });
      }
    }
  }

  cleanVotes() {
    this.votesTotal = this.block.config.number_votes;

    for (let index = 0; index < this.arrayCandidates.length; index++) {
      const element = this.arrayCandidates[index];
      element.amount_assign = 0;
    }

    this.canVote = false;
  }
}
