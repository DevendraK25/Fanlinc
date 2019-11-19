import { Component, HostListener, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fanlinc';
  constructor(private router: Router, private session: SessionStorageService){}

  navig(){
    var user = this.session.retrieve("logged-in")
    this.router.navigate(['/profile'], {queryParams: {user: user}}).then(()=>window.location.reload())
  }
}
