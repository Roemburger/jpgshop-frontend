import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../auth/auth.service";
import {CartService} from "../cart/cart.service";
import {Order} from "./order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = "http://51.38.114.113:8080/api/order"
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

  createOrder(order: Order) {
    this.cartService.setShoppingCart([]);
    localStorage.removeItem('cart');

    //TODO: Do something with the order details

    this.toastrService.success('Order is successfully created.');
    this.router.navigate(['/']);
  }

  // createOrder(debits: string) {
  //   const token = this.authService.getJwtToken();
  //   if (token === '') return;
  //   let options = {
  //     headers: new HttpHeaders()
  //       .set('Auth', 'Bearer ' + token)
  //       .set('Content-Type', 'application/json')
  //   }
  //   return this.http.patch(
  //     this.baseUrl + '/createOrder',
  //     {debits: debits},
  //     options).subscribe({
  //     next: () => {
  //       this.cartService.setShoppingCart([]);
  //       this.toastrService.success('Order is successfully created.');
  //       this.router.navigate(['/']);
  //     },
  //     error: () => this.toastrService.error('Something went wrong. Try again later.')
  //   })
  // }
}
