import { Blog } from './blog.model';
import { User } from './user.model';

export class Likes {

  public user: User;
  public blog: Blog;

  constructor(u: User, b: Blog) {
    this.user = u;
    this.blog = b;
  }

}
