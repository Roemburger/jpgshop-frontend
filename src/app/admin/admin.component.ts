import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from "../product/product.model";
import {ProductService} from "../product/product.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cProduct: Product = {} as Product;

  products: Product[]=[];
  private subscription: Subscription = new Subscription();
  originalProducts: Map<number, Product> = new Map<number, Product>();
  changeDetectionFlag = false;

  constructor(protected authService: AuthService, private productService: ProductService, private toastrService: ToastrService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription = this.productService.getProducts().subscribe((p: Product[]) => {
      this.products = p;

      this.originalProducts.clear();

      this.products.forEach(product => {
        this.originalProducts.set(product.id, {...product});
      });
    })
  }

  createProductByAdmin(name: string, pictureUrl: string, price: string) {
    this.cProduct.name = name;
    this.cProduct.pictureUrl = pictureUrl;
    this.cProduct.price = Number(price);

    if (this.cProduct.name == "" || this.cProduct.pictureUrl == "" || isNaN(this.cProduct.price)){
      this.toastrService.error("All fields need input.")
      return;
    }

    if (Number(price) <= 0) {
      this.toastrService.error("Price needs to be more than zero.")
      return;
    }

    this.productService.createProduct(this.cProduct);
  }

  updateProductByAdmin(productId: number, name: string, pictureUrl: string, price: number) {
    if (productId <= 0 || name == "" || pictureUrl == "" || price == null) {
      this.toastrService.error("All fields need input.")
      return;
    }

    if (price <= 0) {
      this.toastrService.error("Price needs to be more than zero.")
      return;
    }

    let prod = new Product(productId, name, pictureUrl, Number(price))
    this.productService.updateProduct(productId, prod);
  }

  isProductChanged(productId: number): boolean {
    const originalProduct = this.originalProducts.get(productId);
    const currentProduct = this.products.find(p => p.id === productId);

    if (!originalProduct || !currentProduct) {
      return false;
    }

    return originalProduct.name !== currentProduct.name ||
      originalProduct.pictureUrl !== currentProduct.pictureUrl ||
      originalProduct.price !== currentProduct.price;
  }

  onProductChange(productId: number): void {
    if (this.isProductChanged(productId)) {
      this.cdr.markForCheck();
    }
  }

  deleteProductByAdmin(productId: number) {
    if (productId <= 0) {
      this.toastrService.error("Could not determine product ID.");
      return;
    }

    this.productService.deleteProduct(productId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
