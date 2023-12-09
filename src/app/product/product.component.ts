import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "./product.model";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[]=[];
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.subscription = this.productService.getProducts().subscribe((p: Product[]) => {
      this.products = p;
    })
    console.log("loaded products")
  }

  addProductToShoppingCart(id: number) {
    this.productService.addProductToShoppingCart(this.products.find(p => p.id === id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
