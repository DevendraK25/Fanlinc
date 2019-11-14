import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FandomComponent } from './fandom/fandom.component';
import { NewPostComponent } from './new-post/new-post.component';
//import { ForumComponent } from './forum/forum.component';
import { EditprofileComponent } from './editprofile/editprofile.component';


const routes: Routes = [
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'fandoms', component: FandomComponent },
  { path: 'create-new-post', component: NewPostComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  EditprofileComponent,
  AboutComponent,
  LoginComponent, 
  RegisterComponent,
  UserProfileComponent, 
  PageNotFoundComponent, 
  FandomComponent,
  NewPostComponent, 
  HomepageComponent
]
