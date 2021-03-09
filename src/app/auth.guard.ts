import { EventoService } from './evento.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private evento: EventoService) { }
  canActivate() {
    if (this.evento.getCurrentUser()) {
      return true;
    } else {
      console.log("Voy al login");

      // window.location.href = "";
      return false;
    }
  }

}
