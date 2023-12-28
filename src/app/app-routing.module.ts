import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductComponent} from "./product/product.component";
import {AdminComponent} from "./admin/admin.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {CartComponent} from "./cart/cart.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'admin',
    component: AdminComponent
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
    component: CartComponent
  },
  {
    path: 'order',
    component: OrderComponent
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
