import { Component, OnInit} from '@angular/core';
import { BlogsService } from '../blogs.service';
import { DataStorageService } from '../shared/data-storage.service';
// import { Response } from '@angular/http';
import { UserLogin } from '../shared/userLogin.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserLogin;

  constructor(private blogsService: BlogsService,
              private dsService: DataStorageService) { }

  ngOnInit(): void {
    this.dsService.userDetected.subscribe(
      (userLogin: UserLogin) => {
        this.user = userLogin;
        console.log(this.user)
      }
    );
    // console.log(this.user)
  }

  onNavbarSelection(feature: string) {
    this.blogsService.emitFeature(feature);
    window.scroll(0,0)
  }

  onSaveData() {

  }

  onFetchData() {
  }


}
