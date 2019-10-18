import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component( {
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
} )
export class RegisterComponent implements OnInit {

    // createForm: FormGroup;

    constructor( private userService: UserService, private router: Router ) {//}, private fb: FormBuilder, private router: Router) {
        //   this.createForm = this.fb.group({
        //     username: ['', Validators.required],
        //     // firstname: ['', Validators.required],
        //     // lastname: ['', Validators.required],
        //     // email: ['', Validators.required],
        //     // password: ['', Validators.required]
        //   });
    }

    addUser( username, email, password ) {
        this.userService.addUser( username, email, password ).subscribe( response  => {
            console.log("success",response);
        },
            error  => {
                console.log("error", error);
            }, 
            () => {
                console.log("complete");
            }
        );

    }

    ngOnInit() {
    }

}
