import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

// import { BlogsService } from '../blogs.service';

import { Blog } from './blog.model';
import { User } from './user.model';
import { UserLogin } from './userLogin.model';
import { Likes } from './likes.model';
import { Comments } from './comments.model';

@Injectable()
export class DataStorageService {

  blogs: Blog[] = [];
  UserDetails: User;
  likes: Likes[] = [];
  comments: Comments[] = [];

  userLoggedIn: UserLogin;
  userDetected = new EventEmitter<UserLogin>();


  url_blogs = "http://127.0.0.1:8000/blog/";
  user_url = "http://127.0.0.1:8000/user/";
  auth_url = "http://127.0.0.1:8000/api-token-auth/";
  likes_url = "http://127.0.0.1:8000/likes/";

  token: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {  }

  storeBlogs() {

  }

  getBlogs(): Observable<{content: string, id: number, heading: string, shortDescription: string, user: User}[]> {
    return this.http.get<{content: string, id: number, heading: string, shortDescription: string, user: User}[]>(this.url_blogs)
  }

  signIn(user: UserLogin) {

    this.http.post(this.auth_url, user, this.httpOptions).subscribe(
      data => {
        this.updateToken(data['token'])
      }
    );
    console.log("Login done..!")
    this.userLoggedIn = new UserLogin(user.username,user.password);
    this.userDetected.emit(this.userLoggedIn)
  }

  signOut() {

  }

  postUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.user_url, newUser, this.httpOptions);
  }

  updateToken(token) {
    this.token = token;
    console.log(this.token)
  }

  fetchLikes() {
    return this.http.get(this.likes_url);
  }


}
