import { Component, OnInit } from '@angular/core';
import { Blog } from '../shared/blog.model';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DataStorageService } from '../shared/data-storage.service';

import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { FetchedBlog } from '../shared/fetchedBlog.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [
    trigger('expandCollapse', [
                state('open', style({height: '100%', opacity: 1})),
                state('closed', style({height: 0, opacity: 0})),
                transition('* => *', [animate('350ms')])
            ]),
  ]
})

export class PostsComponent implements OnInit {

  blogs: Blog[] = [];
  selectedBlog: Blog;

  constructor(private blogsService: BlogsService,
              private router: Router,
              private dsService: DataStorageService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.blogs = this.blogsService.getBlogs();

    this.blogsService.blogsChanged.subscribe(
      (blogs: Blog[]) => {
        this.blogs = blogs;
      }
    );
    this.selectedBlog = new Blog("","","");
  }



  onEdit(index: number) {
    this.router.navigate(['edit',index]);
    this.blogsService.emitFeature('Edit');
  }

  onDelete(i) {
    this.blogsService.onDeleteBlog(i);
  }

  onView(index: number) {
    var blog: Blog = this.blogsService.getBlogByID(index);
    this.selectedBlog = new Blog(
      blog.heading,
      blog.shortDescription,
      blog.content
    );
    this.selectedBlog.username = blog.username;
    this.selectedBlog.email = blog.email;
  }

}
