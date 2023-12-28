import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class AuthModule {}
