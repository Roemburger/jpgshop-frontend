export class Order {
  public firstName: string;
  public lastName: string;
  public streetName: string;
  public houseNumber: number;
  public zipcode: string;
  public country: string;
  public price: number;

  constructor(
    firstName: string,
    lastName: string,
    streetName: string,
    houseNumber: number,
    zipcode: string,
    country: string,
    price: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.streetName = streetName;
    this.houseNumber = houseNumber;
    this.zipcode = zipcode;
    this.country = country;
    this.price = price;
  }
}
