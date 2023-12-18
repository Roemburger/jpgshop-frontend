import {Component} from '@angular/core';
import {Product} from "../product/product.model";
import {ProductService} from "../product/product.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  product = {} as Product;

  constructor(private productService: ProductService) {}

  createProductByAdmin(name: string, description: string, pictureUrl: string, price: string) {
    this.product.name = name;
    this.product.description = description;
    this.product.pictureUrl = pictureUrl;
    this.product.price = Number(price);

    this.addProductByAdmin();
  }

  addProductByAdmin() {
    if (this.product.name == "" || isNaN(this.product.price)) return;
    this.productService.createProduct(this.product);
  }
}
