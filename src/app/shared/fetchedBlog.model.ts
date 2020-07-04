import { User } from './user.model';

export class FetchedBlog {

  public user: User;
  public heading: string;
  public shortDescription: string;
  public content: string;
  public likes: number;
  public id: number;

  constructor(u: User, h: string, s: string, c: string) {
    this.user = u;
    this.heading = h;
    this.shortDescription = s;
    this.content = c;
    this.likes = 0;
  }


}
