import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {AdminModule} from "./admin/admin.module";
import {ProductService} from "./product/product.service";
import {ProductModule} from "./product/product.module";
import {HeaderModule} from "./header/header.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./auth/auth.module";
import {CartModule} from "./cart/cart.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {AuthService} from "./auth/auth.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ProductModule,
    AdminModule,
    HeaderModule,
    HttpClientModule,
    AuthModule,
    CartModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
  ],
  providers: [ProductService, HttpClientModule, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
