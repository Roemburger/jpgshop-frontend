import {Component} from '@angular/core';
import {Product} from "../product/product.model";
import {ProductService} from "../product/product.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  product: Product = {} as Product;

  constructor(protected authService: AuthService, private productService: ProductService, private toastrService: ToastrService) {}

  createProductByAdmin(name: string, pictureUrl: string, price: string) {
    this.product.name = name;
    this.product.pictureUrl = pictureUrl;
    this.product.price = Number(price);

    this.addProductByAdmin();
  }

  addProductByAdmin() {
    if (this.product.name == "" || isNaN(this.product.price)){
      this.toastrService.error("Make sure to input name and/or price.")
      return;
    }
    this.productService.createProduct(this.product);
  }
}
