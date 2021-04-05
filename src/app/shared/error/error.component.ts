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
  constructor(public errorService: ErrorService) {
    this.errorText = this.errorService.errorText;
  }

  ngOnInit(): void {}
}
