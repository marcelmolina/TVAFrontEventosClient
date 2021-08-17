import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  @Input() block: any;
  @Output() action = new EventEmitter<any>();
  urlVideo: any;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log(this.block);

    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.block.config.url_video
    );
  }
  next() {
    this.action.emit({
      name: 'NEXT',
    });
  }
}
