import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() block: any;
  @Input() backgroundProperty: any;
  @Input() session_id: any;
  @Input() token: any;
  @Input() event_id: any;
  resultsInfo: any;

  @Output() action = new EventEmitter<any>();
  arrayCandidates: any = [];
  isMobile: boolean = false;
  isTablet: boolean = false;
  isWeb: boolean = false;
  lastUpdated: any;

  candidate = {};

  constructor(private _apiService: ApiService) {
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
    this._apiService
      .results(this.event_id, this.session_id, this.token)
      .subscribe(
        response => {
          this.resultsInfo = response;
        },
        error => {},
        () => {
          if (this.resultsInfo.last_updated > 0)
            this.lastUpdated = new Date(this.resultsInfo.last_updated);
          else this.lastUpdated = null;

          this.arrayCandidates = this.resultsInfo.candidates;

          this.arrayCandidates.sort((a, b) => b.votes - a.votes);

          for (let index = 0; index < this.arrayCandidates.length; index++) {
            const element = this.arrayCandidates[index];
            if (this.isMobile) {
              element.img = element.img_mobile.split('?')[0];
            }
            if (this.isTablet) {
              element.img = element.img_tablet.split('?')[0];
            }
            if (this.isWeb) {
              element.img = element.img_desktop.split('?')[0];
            }

            element.fill = 'width: ' + element.votes + '%';
          }
        }
      );
  }

  next() {
    this.action.emit({
      name: 'NEXT'
    });
  }
}
