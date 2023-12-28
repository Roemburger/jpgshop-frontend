import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean | undefined;

  constructor(protected authService: AuthService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  login(email: string, password: string) {
    if (email === undefined) {
      this.toastrService.error("Email address needs input.");
    }

    if (password === undefined || password.length < 8) {
      this.toastrService.error("Password needs at least 8 characters.")
    }

    this.authService.login(email, password);
  }
}
