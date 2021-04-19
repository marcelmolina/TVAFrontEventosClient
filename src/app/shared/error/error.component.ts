import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorText: any;
  fondoGracias: any;
  constructor(public errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorText = this.errorService.errorText;
    this.errorText = 'Gracias por visitarnos';

    if (this.errorText == 'Gracias por visitarnos') {
      this.fondoGracias = 'background-image: url("/assets/img/bg.jpg")';
    } else {
      this.fondoGracias = 'background-color: #fff';
    }
  }
}
