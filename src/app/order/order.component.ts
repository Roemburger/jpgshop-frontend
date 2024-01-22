import {Component, OnInit} from '@angular/core';
import {OrderService} from "./order.service";
import {Router} from "@angular/router";
import {Order} from "./order.model";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Product} from "../product/product.model";
import {CartService} from "../cart/cart.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [AuthService],
})
export class OrderComponent implements OnInit {
  cartContent: Product[] = []
  amountToPay: number = 0.0;

  constructor(
    protected authService: AuthService,
    private orderService: OrderService,
    private cartService: CartService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.cartContent = this.cartService.getShoppingCart();
    this.amountToPay = this.getAmountToPay(this.cartContent);
  }

  processOrderDetails(
    firstName: string,
    lastName: string,
    streetName: string,
    houseNumber: string,
    zipcode: string,
    country: string
  ) {
    if (!firstName || !lastName || !streetName || !houseNumber || !zipcode || !country) {
      this.toastrService.error('Not all fields have been filled.');
      return;
    }

    let order: Order = new Order(
      firstName, lastName, streetName, Number(houseNumber), zipcode, country, Number(this.amountToPay)
    );

    this.orderService.createOrder(order);
  }

  getAmountToPay(products: Product[]): number {
    if (!products) return 0.0;

    let amount = 0;
    for (let p of products) {
      amount += p.price;
      this.amountToPay = Number(
        Number(Math
          .round(amount*100) / 100)
          .toFixed(2));
    }
    return amount;
  }
}
