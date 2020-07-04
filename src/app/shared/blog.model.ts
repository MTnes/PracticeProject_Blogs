// import { User } from './user.model';

export class Blog {

  public username: string;
  public email: string;
  public heading: string;
  public shortDescription: string;
  public content: string;

  public isCollapsed: boolean;

  public id: number;

  public likes: number;
  public usersLike: string[];
  public comments: { username: string, comment: string}[];

  constructor(heading: string, shortDesc: string, content: string) {


    this.heading = heading;
    this.shortDescription = shortDesc;
    this.content = content;

    this.isCollapsed = true;

    this.likes = 0;
    this.usersLike = [];
    this.comments = []

  }

}
