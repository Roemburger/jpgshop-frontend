import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductService} from "../product/product.service";
import {User} from "./user.model";

@Injectable()
export class AuthService {

  baseUrl: string = "http://localhost:8080/api/auth"
  isLoggedIn: boolean = false;
  isAdmin: boolean = true;

  constructor(private productService: ProductService,
              private router: Router,
              private http: HttpClient) {
  }

  public register(user: User) {
    return this.http.post<User>(this.baseUrl + "/register", user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe({
      next: () => {
        console.log("User registered successfully.")
        this.router.navigate(['/auth/login']);
      },
      error: () => console.log("Error: User was not registered.")
    })
  }

  public login(email: string, password: string) {
    localStorage.removeItem('token');
    return this.http.post(this.baseUrl + "/login", {
      "email": email, "password": password
    }, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe({
      next: (token: any) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('email', JSON.stringify(email));
        console.log("Login was successful")
        this.isLoggedIn = true;
        this.isAdmin = true;
        this.router.navigate(['/']);
    },
      error: () => console.log("Error: Could not login. Try again later.")
    });
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/auth/login']);
  }
}
