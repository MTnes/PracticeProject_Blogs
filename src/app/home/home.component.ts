import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private blogsService: BlogsService) {
  }

  ngOnInit(): void {
  }

  onSelectPosts() {
    this.router.navigate(['posts']);
    this.blogsService.emitFeature('Posts');
    window.scroll(0,0)
  }

  OnSelectCreate() {
    this.router.navigate(['create']);
    this.blogsService.emitFeature('Create');
    window.scroll(0,0)
    
  }

}
