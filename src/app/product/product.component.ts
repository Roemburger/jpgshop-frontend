import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "./product.model";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../cart/cart.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [AuthService]
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[]=[];
  private subscription: Subscription = new Subscription();

  constructor(protected authService: AuthService, private productService: ProductService, private toastrService: ToastrService, private cartService: CartService) {
  }

  ngOnInit() {
    this.subscription = this.productService.getProducts().subscribe((p: Product[]) => {
      this.products = p;
    })
  }

  addProductToShoppingCart(id: number) {
    if (!this.authService.isUserLoggedIn()) {
      this.toastrService.error("Login first.");
      return;
    }
    let prod = this.products.find(p => p.id === id);
    let msg: string = this.cartService.addProductToShoppingCart(prod);
    switch (msg) {
      default:
      case "Something went wrong. Try again later.":
        this.toastrService.error(msg);
        break;
      case "Product is already in cart.":
        this.toastrService.error(msg);
        break;
      case "Product is added to cart.":
        this.toastrService.success(msg);
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
