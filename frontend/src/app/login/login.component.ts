import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  // @ViewChild('check', {static:false}) check: ElementRef;

  form: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['', Validators.required]
    })
  }

  getUser(username, password){
    if (this.form.valid){
      this.userService.getUser(username, password).subscribe(res => {
        if (res.status == 200) {
          console.log("User '"+username+"' retrieved");
          console.log(res)
          this.router.navigate(['/']);
        }
      });
    }
  }

}
