import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductService} from "../product/product.service";
import {User} from "./user.model";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../cart/cart.service";

@Injectable()
export class AuthService {
  baseUrl: string = "http://51.38.114.113/api/auth"

  constructor(private router: Router,
              private http: HttpClient,
              private cartService: CartService,
              private toastrService: ToastrService) {
  }

  public register(user: User) {
    return this.http.post<User>(this.baseUrl + "/register", user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe({
      next: () => {
        this.toastrService.success("User registered successfully.")
        localStorage.removeItem('cart');
        this.cartService.setShoppingCart([]);
        this.router.navigate(['/login']);
      },
      error: () => this.toastrService.error("Error: User was not registered.")
    })
  }

  public login(email: string, password: string) {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    this.cartService.setShoppingCart([]);
    return this.http.post(this.baseUrl + "/login", {
      "email": email, "password": password
    }, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe({
      next: (token: any) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('email', JSON.stringify(email));

        this.toastrService.success("Login was successful");

        this.router.navigate(['/']);
    },
      error: () => this.toastrService.error("Error: Could not login. Try again later.")
    });
  }

  isUserLoggedIn(): boolean {
    return JSON.parse(<string>localStorage.getItem('email')) != null;
  }

  isUserAdmin(): boolean {
    return JSON.parse(<string>localStorage.getItem('email')) == "test@test.com";
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  getJwtToken(): string {
    const storedToken = this.getToken();
    if (storedToken) {
      try {
        const tokenObject = JSON.parse(storedToken);
        return tokenObject.token || '';
      } catch (error) {
        console.error('Error parsing token:', error);
        this.toastrService.error('Jwt token error.');
        return '';
      }
    }
    return '';
  }
}
