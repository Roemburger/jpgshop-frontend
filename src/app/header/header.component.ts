import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean | undefined;
  isAdmin: boolean | undefined;

  constructor(protected authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.isAdmin = this.authService.isUserAdmin();
  }
}
