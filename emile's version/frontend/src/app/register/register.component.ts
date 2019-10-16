import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // createForm: FormGroup;
  // constructor(){}
  constructor(private userService: UserService, private router: Router){//}, private fb: FormBuilder, private router: Router) {
    // this.createForm = this.fb.group({
    //   username: ['', Validators.required],
    //   firstname: ['', Validators.required],
    //   lastname: ['', Validators.required],
    //   password: ['', Validators.required],
    //   email: ['', Validators.required]
    // });
  }
  
  public addUser(username, firstname, lastname, password, email) {
    this.userService.addUser(username, firstname, lastname, password, email).subscribe((user) => {
      // this.router.navigate(['/login']);
      console.log(user);
    });
  }

  ngOnInit() {
  }

}
