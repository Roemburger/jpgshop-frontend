import { Component } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent {

  constructor(private authService: AuthService) {
  }

  login(email: string, password: string) {
    if (!this.isValidInput(email, password)) return;
    this.authService.login(email, password);
  }

  isValidInput(email: string, password: string) {
    if (email === undefined) return false;

    if (password === undefined || password.length < 8) {
      return false;
    }

    return true;
  }
}
