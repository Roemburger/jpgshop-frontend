import {NgModule} from "@angular/core";
import {CartComponent} from "./cart.component";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class CartModule {}
