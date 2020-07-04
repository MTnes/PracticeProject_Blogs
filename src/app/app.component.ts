import { Component, OnInit } from '@angular/core';
import { Blog } from './shared/blog.model';
import { User } from './shared/user.model';
import { DataStorageService } from './shared/data-storage.service';

import { FetchedBlog } from './shared/fetchedBlog.model';
import { BlogsService } from './blogs.service';
import { HttpClient } from '@angular/common/http';

import { Likes } from './shared/likes.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  fetchedBlogs: FetchedBlog[] = [];
  likes: Likes[] = [];

  constructor(private blogsService: BlogsService,
              private dsService: DataStorageService,
              private http: HttpClient) {  }

  ngOnInit() {
    this.fetchBlogs();
    this.calcLikes();
  }

  fetchBlogs(): void {

    this.dsService.getBlogs().subscribe(
      data => {
        this.fetchedBlogs = data['results']

        console.log(this.fetchedBlogs)

        for(let blog of this.fetchedBlogs) {
          var user: User;
          this.http.get<User>(String(blog.user)).subscribe(
            data => {
              user = data;
              var newBlog = new Blog(blog.heading, blog.shortDescription, blog.content);
              newBlog.username = user.username;
              newBlog.email = user.email;
              newBlog.id = blog.id;
              console.log(newBlog)
              this.blogsService.addNewBlog(newBlog)
              this.blogsService.usernames.push(newBlog.username)
            }
          );
        }

      }
    );
  }

  calcLikes() {
    this.dsService.fetchLikes().subscribe(
      data => {
        for(let temp of data['results']) {
          var username: string;
          var blogId: number;

          this.http.get<User>(String(temp.user)).subscribe(
            userData => {
              this.http.get<Blog>(String(temp.blog)).subscribe(
                blogData => {
                  this.blogsService.addLike(blogData.id, userData.username)
                }
              );
            }
          );

        }
      }
    );
  }


}
