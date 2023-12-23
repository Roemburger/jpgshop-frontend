import {Injectable} from "@angular/core";
import {Product} from "../product/product.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = "http://localhost:8080/api/cart"
  tempShoppingCart: Product[]=[];
  behaviorSubject = new BehaviorSubject([])

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastrService,
    private authService: AuthService) {}

  getShoppingCart(): Product[] {
    return JSON.parse(<any>localStorage.getItem('cart'));
  }

  setShoppingCart(items: any) {
    localStorage.setItem('cart', JSON.stringify(items))
  }

  addProductToShoppingCart(product: Product | undefined) {
    const prod = JSON.parse(<any>localStorage.getItem('cart'));
    let productAlive: Product | undefined;
    if (product == undefined) return;

    if (prod) {
      productAlive = prod.find((p: {id: number}) => {
        return p.id === product.id;
      });
    }

    if (productAlive) {
      productAlive.quantity++;
      this.setShoppingCart(prod);
    } else {
      if (prod) {
        const newItem = [...prod, product];
        this.setShoppingCart(newItem);
        this.behaviorSubject.next(JSON.parse(<any>localStorage.getItem('cart')));
      } else {
        this.tempShoppingCart.push(product);
        this.setShoppingCart(this.tempShoppingCart);
      }
    }
  }

  createOrder(debits: string) {
    const token = this.authService.getJwtToken();
    if (!token) return;
    let options = {
      headers: new HttpHeaders()
        .set('Auth', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.patch(
      this.baseUrl + '/createOrder',
      {debits: debits},
      options).subscribe({
      next: () => {
        this.setShoppingCart([]);
        this.toastrService.success('Order is successfully created.');
        this.router.navigate(['/']);
      },
      error: () => this.toastrService.error('Something went wrong. Try again later.')
    })
  }
}
