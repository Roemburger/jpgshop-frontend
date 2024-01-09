import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductService} from "../product/product.service";
import {User} from "./user.model";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthService {
  baseUrl: string = "http://51.38.114.113:8080/api/auth"
  isLoggedIn: boolean | undefined;
  isAdmin: boolean | undefined;
  email = JSON.parse(<string>localStorage.getItem('email'));
  token = JSON.parse(<string>localStorage.getItem('token'));

  constructor(private router: Router,
              private http: HttpClient,
              private toastrService: ToastrService) {
  }

  public register(user: User) {
    return this.http.post<User>(this.baseUrl + "/register", user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe({
      next: () => {
        this.toastrService.success("User registered successfully.")
        this.router.navigate(['/login']);
      },
      error: () => this.toastrService.error("Error: User was not registered.")
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

        console.log('JSON.stringify token = ' + JSON.stringify(token));
        console.log('JSON.stringify email = ' + JSON.stringify(email));

        this.toastrService.success("Login was successful")
        this.isLoggedIn = this.isUserLoggedIn();
        this.isAdmin = this.isUserAdmin();
        this.router.navigate(['/']);
    },
      error: () => this.toastrService.error("Error: Could not login. Try again later.")
    });
  }

  isUserLoggedIn(): boolean {
    return this.email != null;
  }

  isUserAdmin(): boolean {
    return this.email == "test@test.com"
  }

  getToken(): string {
    return this.token;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isLoggedIn = this.isUserLoggedIn();
    this.isAdmin = this.isUserAdmin();
    this.router.navigate(['/login']);
  }

  getJwtToken(): string {
    const storedToken = this.getToken();
    console.log('Storedtoken = ' + this.token);

    try {
      const parsedToken = storedToken ? JSON.parse(storedToken) : null;
      console.log('Parsedtoken = ' + parsedToken);
      if (parsedToken !== null && typeof parsedToken === 'object') {
        return Object.values(parsedToken).toString();
      } else {
        this.toastrService.error('Invalid token format');
      }
    } catch (error) {
      console.error('Error parsing token:', error);
      this.toastrService.info('You need to login first.');
    }
    return '';
  }

}
