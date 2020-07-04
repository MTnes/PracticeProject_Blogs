import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from '../shared/user.model';
import { UserLogin } from '../shared/userLogin.model';

import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';
import { BlogsService } from '../blogs.service';

import { Blog } from '../shared/blog.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User;
  auth_User: UserLogin;

  blogs: Blog[]

  constructor(private dsService: DataStorageService,
              private router: Router,
              private blogsService: BlogsService) {  }

  SignUpForm = new FormGroup({
    'username': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required),
    'email': new FormControl("", [Validators.required,Validators.email]),
    'first_name': new FormControl("", Validators.required),
    'last_name': new FormControl("")
  });

  SignInForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.blogs = this.blogsService.getBlogs();
    this.newUser = new User("","","","","");
    this.auth_User = new UserLogin("","")
  }

  onSignIn() {
    const user = new UserLogin(this.SignInForm.value['username'],this.SignInForm.value['password']);
    this.auth_User = user;
    console.log(this.auth_User);
    this.dsService.signIn(this.auth_User);
    this.SignInForm.reset()
    this.router.navigate(['home']);
    this.blogsService.emitFeature('Home');
  }

  onSignUp() {
    this.auth_User = new UserLogin(this.SignUpForm.value['username'],this.SignUpForm.value['password']);
    this.newUser = new User(
      this.SignUpForm.value['username'],
      this.SignUpForm.value['password'],
      this.SignUpForm.value['email'],
      this.SignUpForm.value['first_name'],
      this.SignUpForm.value['last_name'],
    );
    console.log(this.newUser)
    console.log(this.SignUpForm.get('username').errors)
    this.dsService.postUser(this.newUser).subscribe();
    this.SignUpForm.reset()

    console.log(this.auth_User);
    // this.dsService.signIn(this.auth_User);

  }

}
