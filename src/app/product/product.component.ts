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
  isLoggedIn: boolean | undefined;
  isAdmin: boolean | undefined;

  constructor(protected authService: AuthService, private productService: ProductService, private toastrService: ToastrService, private cartService: CartService) {
  }

  ngOnInit() {
    this.subscription = this.productService.getProducts().subscribe((p: Product[]) => {
      this.products = p;
    })

    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.isAdmin = this.authService.isUserAdmin();
  }

  addProductToShoppingCart(id: number) {
    if (!this.authService.isUserLoggedIn()) {
      this.toastrService.error("Login first.");
      return;
    }
    this.cartService.addProductToShoppingCart(this.products.find(p => p.id === id));
    this.toastrService.success("Product is added to cart.");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
