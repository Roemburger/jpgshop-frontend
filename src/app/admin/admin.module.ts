import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  declarations: [
    AdminComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive
    ]
})
export class AdminModule {}
