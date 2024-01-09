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
  baseUrl: string = "http://51.38.114.113:8080/api/products"
  behaviorSubject = new BehaviorSubject([])

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastrService,
    private authService: AuthService) {
    const product = JSON.parse(<any>localStorage.getItem('cart'));
    if (product) this.behaviorSubject.next(product);
  }

  public createProduct(product: Product) {
    const storedToken = this.authService.getJwtToken();

    if (storedToken === '') {
      this.toastrService.error("No token available. Unable to create product.");
      return;
    }

    let options = {
      headers: new HttpHeaders().set('Auth', 'Bearer ' + storedToken)
    };

    this.http.post<Product>(this.baseUrl + "/createProduct", product, options)
      .subscribe({
        next: () => this.toastrService.success("Created product successfully"),
        error: () => this.toastrService.error("Error: could not create product")
      });
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + "/getProducts");
  }
}
