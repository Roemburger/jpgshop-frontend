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
  ],
  providers: [ProductService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
