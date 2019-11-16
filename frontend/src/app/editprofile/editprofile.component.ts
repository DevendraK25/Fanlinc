import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
	selector: 'app-editprofile',
	templateUrl: './editprofile.component.html',
	styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
	username = "";
	password = "";
	email = "";
	bio = "";
	age = "";
	image ="";
	constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.userService.getUserByUsername(this.route.snapshot.queryParamMap.get('user')).subscribe(
			res => {
				if (res.status == 200)
					this.username = res.body[0].username;
				(<HTMLInputElement>document.getElementById("password")).value = res.body[0].password;
				(<HTMLInputElement>document.getElementById("email")).value = res.body[0].email;
				(<HTMLInputElement>document.getElementById("bio")).value = res.body[0].profile.bio;
				(<HTMLInputElement>document.getElementById("age")).value = res.body[0].profile.age;
				(<HTMLInputElement>document.getElementById("image")).value = res.body[0].image;

			},
			err => {
				this.router.navigate(['/page-not-found']);
			}
		);
	}
	saveChanges(password, email, bio, age, image) {
		this.userService.updateUser(this.username, email, password, bio, age, image).subscribe(
			res => {
				if (res.status == 200)
					this.router.navigate(['/profile'], { 'queryParams': { 'user': this.username } });
				console.log(res);
			},
			err => {
				console.log(err);
			}
		)
	}
}
