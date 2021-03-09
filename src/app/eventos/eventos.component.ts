import { EventoService } from './../evento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  backgroundImage: string;
  constructor(private router: ActivatedRoute, private evento: EventoService) {
    this.backgroundImage = "assets/img/fondo1.jpg";
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      console.log(params.get("token"));
    })
  }

}
