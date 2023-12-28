import {Component, OnInit} from '@angular/core';
import {Product} from "../product/product.model";
import {CartService} from "./cart.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [AuthService],
})
export class CartComponent implements OnInit {
  cartContent: Product[] = []
  amountToPay: number = 0.0;
  isAdmin: boolean | undefined;
  isLoggedIn: boolean | undefined;

  constructor(protected authService: AuthService, private cartService: CartService) {
  }

  ngOnInit() {
    this.cartContent = this.cartService.getShoppingCart();
    this.amountToPay = this.getAmountToPay(this.cartContent);
    this.isAdmin = this.authService.isUserAdmin();
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  putOrder(debits: number) {
    this.cartService.createOrder(debits.toString());
    localStorage.removeItem('cart');
  }

  getAmountToPay(products: Product[]): number {
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

  deleteCartItem(index: number) {
    this.cartContent.splice(index, 1);
    this.cartService.setShoppingCart(this.cartContent);
  }
}
