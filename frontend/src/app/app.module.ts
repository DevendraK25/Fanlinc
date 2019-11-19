import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NewPostComponent } from './new-post/new-post.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FandomPageComponent } from './fandom-page/fandom-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FandomComponent } from './fandom/fandom.component';
import { NewFandomComponent } from './new-fandom/new-fandom.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NewPostComponent,
    EditprofileComponent,
    FandomPageComponent,
	UserProfileComponent,
  FandomComponent,
  NewFandomComponent
  ],
  imports: [
    NgbDropdownModule,
    BrowserModule,
    NgbModule,
    MatToolbarModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    NgxWebstorageModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent, routingComponents]
})
export class AppModule { }
