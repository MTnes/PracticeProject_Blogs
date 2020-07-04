import { Component, OnInit, Input } from '@angular/core';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() feature: string = 'Home';

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.blogsService.homeFeature.subscribe(
      (feature: string) => {
        this.feature = feature;
      }
    );
  }

}
