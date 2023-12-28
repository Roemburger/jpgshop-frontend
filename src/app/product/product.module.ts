import {NgModule} from "@angular/core";
import {ProductComponent} from "./product.component";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  declarations: [
    ProductComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive
    ]
})
export class ProductModule {}
