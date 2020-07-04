import { Blog } from './blog.model';
import { User } from './user.model';

export class Comments {

  public user: User;
  public blog: Blog;
  public comment: string;

  constructor(u: User, b: Blog, c: string) {
    this.user = u;
    this.blog = b;
    this.comment = c;
  }

}
