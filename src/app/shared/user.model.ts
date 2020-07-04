export class User {

  public username: string;
  public password: string;
  public email: string;
  public first_name: string;
  public last_name: string;

  constructor(u: string, p: string, e: string, f: string, l:string) {
    this.username = u;
    this.password = p;
    this.email = e;
    this.first_name = f;
    this.last_name = l;
  }




}
