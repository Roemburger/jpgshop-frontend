export class User {
  public id: string;
  public email: string;
  public username: string;
  public password: string;
  public isAdmin: boolean;

  constructor(id: string, email: string, username: string, password: string, isAdmin: boolean) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
