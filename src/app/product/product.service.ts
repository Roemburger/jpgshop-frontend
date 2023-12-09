import {Injectable} from "@angular/core";
import {Product} from "./product.model";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "http://localhost:8080/api/products"
  products: Product[]=[];
  shoppingCart: Product[]=[];
  behaviorSubject = new BehaviorSubject([])
  tempShoppingCart: Product[]=[];

  constructor(private router: Router, private http: HttpClient) {
    const product = JSON.parse(<any>localStorage.getItem('cart'));
    if (product) this.behaviorSubject.next(product);
  }

  getJwtToken(): string | null {
    const storedToken = localStorage.getItem('token');

    if (storedToken !== null && storedToken !== undefined) {
      return Object.values(JSON.parse(storedToken)).toString();
    } else {
      console.log("No token available");
      return null;
    }
  }

  public createProduct(product: Product) {
    const storedToken = this.getJwtToken();

    if (storedToken === null) {
      console.log("No token available. Unable to create product.");
      return;
    }

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + storedToken)
    };

    this.http.post<Product>(this.baseUrl + "/admin/createProduct", product, options)
      .subscribe({
        next: () => console.log("Created product successfully"),
        error: () => console.log("Error: could not create product")
      });
  }



  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + "/getProducts");
  }

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
}
