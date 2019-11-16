import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	form: FormGroup;
	username = "";
	email = "";
	age = "";
	constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router, private session: SessionStorageService) { }

	ngOnInit() {
		var user = this.session.retrieve("logged-in")
		if (user != null){
			this.userService.getUserByUsername(user).subscribe(
				res => {
					if (res.status == 200){
						this.username = res.body[0].username;
						this.email = res.body[0].email;
						this.age = res.body[0].profile.age;
						(<HTMLInputElement>document.getElementById("bio")).value = res.body[0].profile.bio;
					}
					
				},
				err => {
					console.log(err);
				}
			)
		}
		else {
			alert('sign in first!');
			this.router.navigate(['/login']);
		}
	}

	redirectToEditProfile() {
		this.router.navigate(['/editprofile'], { 'queryParams': { 'user': this.username } });
	}
	editBio(biotext, save) {
		biotext.removeAttribute('readonly');
		biotext.style.outline = 'auto';
		biotext.style.resize = 'auto';
	}

}
