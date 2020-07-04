import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { CreateComponent } from './create/create.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TitleComponent } from './title/title.component';

import { BlogsService } from './blogs.service';
import { DataStorageService } from './shared/data-storage.service';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './shared/auth.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    CreateComponent,
    AboutComponent,
    FooterComponent,
    HomeComponent,
    TitleComponent,
    RegisterComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [BlogsService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
