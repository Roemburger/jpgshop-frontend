import {Component, ViewChild} from '@angular/core';
import {User} from "../user.model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent {
  user = {} as User;

  @ViewChild('password') password: any;
  @ViewChild('repeatPassword') repeatPassword: any;

  constructor(private authService: AuthService) {
  }

  createUser(email: string, username: string, password: string, repeatPassword: string) {
    this.user.email = email;
    this.user.username = username;
    this.user.password = password;

    if (password !== repeatPassword) {
      return;
    }

    this.password.nativeElement.value = '';
    this.repeatPassword.nativeElement.value = '';

    this.authService.register(this.user);
  }
}
