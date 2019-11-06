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

import { NewPostComponent } from './new-post/new-post.component';
import { EditprofileComponent } from './editprofile/editprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NewPostComponent,
    EditprofileComponent
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
    MDBBootstrapModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent, routingComponents]
})
export class AppModule { }
