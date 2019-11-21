import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    //this is to check that all fields are filled before submitting form
    this.form = this.fb.group({
      username: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  
  addUser(username, email, password) {
    if (this.form.valid){
      this.userService.addUser(username, email, password).subscribe(
        res => {
          if (res.status == 200) {
            console.log('User \''+username+'\' was successfully created');
            console.log(res);
            this.router.navigate(['/login']); //redirect to login page if sign up successful
          }        
        },
        err => {
            this.router.navigate(['/page-not-found']);
        }
      );
    }
  }

}
