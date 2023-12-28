import {Injectable} from "@angular/core";
import {Product} from "../product/product.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = "http://localhost:8080/api/cart"
  tempShoppingCart: Product[]=[];
  behaviorSubject = new BehaviorSubject([])

  constructor() {}

  getShoppingCart(): Product[] {
    return JSON.parse(<any>localStorage.getItem('cart'));
  }

  setShoppingCart(items: any) {
    localStorage.setItem('cart', JSON.stringify(items))
  }

  addProductToShoppingCart(product: Product | undefined): string {
    const prod = JSON.parse(<any>localStorage.getItem('cart'));
    let productAlive: Product | undefined;
    if (product == undefined) return "Something went wrong. Try again later.";

    if (prod) {
      productAlive = prod.find((p: {id: number}) => {
        return p.id === product.id;
      });
    }

    if (productAlive) {
      return "Product is already in cart.";
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
    return "Product is added to cart."
  }
}
