import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductComponent} from "./product/product.component";
import {AdminComponent} from "./admin/admin.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {CartComponent} from "./cart/cart.component";
import {OrderComponent} from "./order/order.component";
import {AuthGuard} from "./auth.guard";
import {Auth2Guard} from "./auth2.guard";

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [Auth2Guard]
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [Auth2Guard]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
