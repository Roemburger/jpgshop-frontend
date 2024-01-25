import {Injectable} from "@angular/core";
import {Product} from "./product.model";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "http://51.38.114.113/api/products"
  behaviorSubject = new BehaviorSubject([])

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastrService,
    private authService: AuthService) {
    const product = JSON.parse(<any>localStorage.getItem('cart'));
    if (product) this.behaviorSubject.next(product);
  }

  createHttpHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    return headers.set(
      'Authorization', 'Bearer ' + this.authService.getJwtToken()
    )
  }

  public createProduct(product: Product) {
    this.http.post<Product>(this.baseUrl + "/createProduct", product, { headers: this.createHttpHeaders()})
      .subscribe({
        next: () => this.toastrService.success("Created product successfully"),
        error: () => this.toastrService.error("Error: could not create product")
      });
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + "/getProducts");
  }

  updateProduct(productId: any, product: Product) {
    this.http.put<Product>(this.baseUrl + `/updateProduct/${productId}`, product, { headers: this.createHttpHeaders()})
      .subscribe({
        next: () => this.toastrService.success("Updated product successfully"),
        error: () => this.toastrService.error("Error: could not update product")
      });
  }

  deleteProduct(productId: any) {
    this.http.delete<Product>(this.baseUrl + `/deleteProduct/${productId}`, { headers: this.createHttpHeaders()})
      .subscribe({
        next: () => this.toastrService.success("Deleted product successfully"),
        error: () => this.toastrService.error("Error: could not delete product")
      })
  }
}
