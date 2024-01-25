import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../auth/auth.service";
import {CartService} from "../cart/cart.service";
import {Order} from "./order.model";
import {Product} from "../product/product.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = "http://51.38.114.113/api/order"
  debits: number = 0.0;

  constructor(private router: Router,
              private http: HttpClient,
              private toastrService: ToastrService,
              private authService: AuthService,
              private cartService: CartService) {
  }

  proceedToOrder(debits: number) {
    this.debits = debits;
  }

  createHttpHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    return headers.set(
      'Authorization', 'Bearer ' + this.authService.getJwtToken()
    )
  }

  createOrder(order: Order) {
    this.cartService.setShoppingCart([]);
    localStorage.removeItem('cart');

    // this.http.post<Order>(this.baseUrl + "/createOrder", order, { headers: this.createHttpHeaders()})
    //   .subscribe({
    //     next: () => {
    //       this.toastrService.success("Created order successfully");
    //       this.cartService.setShoppingCart([]);
    //       localStorage.removeItem('cart');
    //     },
    //     error: () => this.toastrService.error("Error: could not create order")
    //   });

    this.toastrService.success('Order is successfully created.');
    this.router.navigate(['/']);
  }
}
