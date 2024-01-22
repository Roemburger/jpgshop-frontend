import {Component, OnInit} from '@angular/core';
import {Product} from "../product/product.model";
import {CartService} from "./cart.service";
import {AuthService} from "../auth/auth.service";
import {Location} from "@angular/common";
import {OrderService} from "../order/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [AuthService],
})
export class CartComponent implements OnInit {
  cartContent: Product[] = []
  amountToPay: number = 0.0;
  isCartEmpty: boolean | undefined;

  constructor(
    private location: Location,
    protected authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router) {
  }

  ngOnInit() {
    this.cartContent = this.cartService.getShoppingCart();
    this.amountToPay = this.getAmountToPay(this.cartContent);
    this.isCartEmpty = this.checkIsCartEmpty();
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

  checkIsCartEmpty(): boolean {
    return this.amountToPay === 0.00;
  }

  deleteCartItem(index: number) {
    this.cartContent.splice(index, 1);
    this.cartService.setShoppingCart(this.cartContent);
    window.location.reload();
  }

  proceedToCheckout(debits: number) {
    this.orderService.proceedToOrder(debits);
    this.router.navigate(['/order']);
  }
}
