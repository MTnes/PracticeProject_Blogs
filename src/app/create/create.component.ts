import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Blog } from '../shared/blog.model';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  editMode = false;
  index: number;
  blog: Blog;
  blogForm = new FormGroup({
    // 'name': new FormControl('', Validators.required),
    // 'email': new FormControl('', Validators.required),
    'heading': new FormControl('', Validators.required),
    'shortDescription': new FormControl('', Validators.required),
    'content': new FormControl()
  });

  constructor(private route: ActivatedRoute,
              private blogsService: BlogsService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id'] != null) {
          this.editMode = true;
          this.index = +params['id'];

          this.blog = this.blogsService.getBlog(this.index);
          // let name = this.blog.name;
          // let email = this.blog.email;
          let heading = this.blog.heading;
          let shortDesc = this.blog.shortDescription;
          let content = this.blog.content;

          this.blogForm.patchValue({
            // 'name': name,
            // 'email': email,
            'heading': heading,
            'shortDescription': shortDesc,
            'content': content
          });

        }
      }
    );
  }

  onSubmit() {
    const newBlog = new Blog(
      // this.blogForm.value['name'],
      // this.blogForm.value['email'],
      this.blogForm.value['heading'],
      this.blogForm.value['shortDescription'],
      this.blogForm.value['content']
    );

    if(this.editMode) {
      this.blogsService.updateBlogById(newBlog,this.index);
    } else {
      this.blogsService.addNewBlog(newBlog);
    }

    this.router.navigate(['posts']);
    this.blogsService.emitFeature('Posts');

  }

  onClear() {
    this.blogForm.reset();
    if(this.editMode == true) {
      window.scroll(0,0)
    }
    this.editMode = false;
    this.router.navigate(['create']);
    this.blogsService.emitFeature('Create');

  }

  onCancel() {
    this.router.navigate(['home']);
    this.blogsService.emitFeature('Home');
  }

}
