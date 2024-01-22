import {Injectable, OnInit} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class Auth2Guard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
