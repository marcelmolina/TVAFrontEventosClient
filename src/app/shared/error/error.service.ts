import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public errorText;
  public codeHtml;

  constructor() {}
}
