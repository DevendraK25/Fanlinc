import { Component, HostListener, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fanlinc';
}
