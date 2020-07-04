import { EventEmitter, Injectable } from '@angular/core';
import { Blog } from './shared/blog.model';
import { DataStorageService } from './shared/data-storage.service';

@Injectable()
export class BlogsService {


  constructor(private dsService: DataStorageService) { }

  homeFeature = new EventEmitter<string>();
  blogsChanged = new EventEmitter<Blog[]>();
  usernames : string[] = [];

  private blogs: Blog[] = [];

  emitFeature(feature: string) {
    this.homeFeature.emit(feature);
  }

  getBlogs() {
    return this.blogs.slice();
  }

  getBlog(index: number) {
    return this.blogs.slice()[index];
  }

  onDeleteBlog(index: number) {
    this.blogs.splice(index,1);
    this.blogsChanged.emit(this.blogs.slice());
  }

  addNewBlog(blog: Blog) {
    this.blogs.push(blog);
    this.blogsChanged.emit(this.blogs.slice());
  }

  updateBlogs(fetchedBlogs: Blog[]) {
    this.blogs = fetchedBlogs;
    this.blogsChanged.emit(this.blogs.slice());
  }

  updateBlogById(blog: Blog, index: number) {
    this.blogs[index] = blog;
    this.blogsChanged.emit(this.blogs.slice());
  }

  getBlogByID(index: number) {
    return this.blogs[index];
  }

  getUniqueBlogById(id: number) {
    for(let blog of this.blogs) {
      if(blog.id == id) return blog
    }
    return null;
  }

  addLike(id: number, username: string) {
    for(let blog of this.blogs) {
      if(blog.id == id) {
        blog.usersLike.push(username);
        blog.likes = blog.likes + 1;
      }
    }
  }

}
