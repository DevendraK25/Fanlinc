import { Component, OnInit} from '@angular/core';
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
	constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		// this.userService.getUserByUsername(this.route.snapshot.queryParamMap.get('user')).subscribe(
		// 	res => {
		// 		if (res.status == 200)
		// 			this.username = res.body[0].username;
		// 			document.getElementById("password").value = res.body[0].password;
		// 			document.getElementById("email").value = res.body[0].email;
		// 			document.getElementById("bio").value = res.body[0].profile.bio;
		// 			document.getElementById("age").value = res.body[0].profile.age;
					
		// 	},
		// 	err => {
		// 		this.router.navigate(['/page-not-found']);
		// 	}
		// );
	}
	saveChanges(password, email, bio, age) {
		// this.userService.updateUser(this.username, email, password, bio, age).subscribe(
		// 	res => {
		// 		if (res.status == 200)
		// 			this.router.navigate(['/profile'], { 'queryParams': { 'user': this.username } });
		// 			console.log(res);
		// 	},
		// 	err => {
		// 		console.log(err);
		// 	}
		// )
	}
}
