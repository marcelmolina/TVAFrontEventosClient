import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TVAFrontEventosClient';
  backgroundImage: string;
  constructor() {
    this.backgroundImage = "assets/img/fondo1.jpg";
  }

}
