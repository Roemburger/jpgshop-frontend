import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductService} from "../product/product.service";
import {User} from "./user.model";

@Injectable()
export class AuthService {

  baseUrl: string = "http://localhost:8080/api/auth"

  constructor(private productService: ProductService,
              private router: Router,
              private http: HttpClient) {
  }

  public register(user: User) {
    return this.http.post<User>(this.baseUrl + "/register", user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe({
      next: () => console.log("User registered successfully."),
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
        this.router.navigate(['/']);
    },
      error: () => console.log("Error: Could not login. Try again later.")
    });
  }
}
