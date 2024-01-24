import {Component, ViewChild} from '@angular/core';
import {User} from "../user.model";
import {AuthService} from "../auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent {
  user: User = {} as User;

  @ViewChild('password') password: any;
  @ViewChild('repeatPassword') repeatPassword: any;

  constructor(protected authService: AuthService, private toastrService: ToastrService) {
  }

  createUser(email: string, username: string, password: string, repeatPassword: string) {
    this.user.email = email;
    this.user.username = username;
    this.user.password = password;

    if (email == "" || username == "" || password == "" || repeatPassword == "") {
      this.toastrService.error("All fields need input.")
      return;
    }

    if (password !== repeatPassword) {
      this.toastrService.error("Password and repeated password do not match.");
      return;
    }

    const minLength = 8;
    const maxLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || password.length > maxLength) {
      this.toastrService.error("Password must be 8-20 characters long.");
      return;
    }

    if (!hasUpperCase) {
      this.toastrService.error("Password must include at least one uppercase letter.");
      return;
    }

    if (!hasLowerCase) {
      this.toastrService.error("Password must include at least one lowercase letter.");
      return;
    }

    if (!hasNumber) {
      this.toastrService.error("Password must include at least one number.");
      return;
    }

    if (!hasSpecialChar) {
      this.toastrService.error("Password must include at least one special character.");
      return;
    }

    this.password.nativeElement.value = '';
    this.repeatPassword.nativeElement.value = '';

    this.authService.register(this.user);
  }
}
