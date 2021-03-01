import { Component } from '@angular/core';

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
