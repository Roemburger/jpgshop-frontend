import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent {

  constructor(protected authService: AuthService, private toastrService: ToastrService) {
  }

  login(email: string, password: string) {
    if (email === undefined || email == "") {
      this.toastrService.error("Email address needs input.");
    }

    if (password === undefined || password.length < 8) {
      this.toastrService.error("Password needs at least 8 characters.")
    }

    this.authService.login(email, password);
  }
}
