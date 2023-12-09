export class Product {
  public id: number;
  public name: string;
  public description: string;
  public pictureUrl: string;
  public price: number;
  public quantity: number;

  constructor(id: number, name: string, description: string, pictureUrl: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.pictureUrl = pictureUrl;
    this.price = price;
    this.quantity = quantity;
  }
}
