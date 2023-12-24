export class Product {
  public id: number;
  public name: string;
  public pictureUrl: string;
  public price: number;
  public quantity: number;

  constructor(id: number, name: string, pictureUrl: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.pictureUrl = pictureUrl;
    this.price = price;
    this.quantity = quantity;
  }
}
