import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  
  // @ViewChild('check', {static:false}) check: ElementRef;
  
  ngAfterViewInit(): void {
  }

  constructor(private userService: UserService) { }

  getUser(username, password){
    this.userService.getUser(username, password).subscribe(res => {
      if (res.status == 200) console.log(res.body);
    });
  }

  ngOnInit() {
  }

}
