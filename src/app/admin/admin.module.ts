import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdminComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule
    ]
})
export class AdminModule {}
