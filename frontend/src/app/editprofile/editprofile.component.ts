import { Component, OnInit, Renderer2 } from '@angular/core';
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
	type = ""
	level = ""
	newType = ""
	newLevel = ""
	types = ["General-fan", "Cosplayer", "Vendor", "Artist"]
	levels = ["Limited", "Casual", "Very-involved", "Expert"]
	interests = []
	pendingFriends = []
	friends = []
	fandoms = []
	
	constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private r: Renderer2) { }

	ngOnInit() {
		this.userService.getUserByUsername(this.route.snapshot.queryParamMap.get('user')).subscribe(
			res => {
				this.username = res.body[0].username;
				(<HTMLInputElement>document.getElementById("password")).value = res.body[0].password;
				(<HTMLInputElement>document.getElementById("email")).value = res.body[0].email;
				(<HTMLInputElement>document.getElementById("bio")).value = res.body[0].profile.bio;
				(<HTMLInputElement>document.getElementById("age")).value = res.body[0].profile.age;
				(<HTMLInputElement>document.getElementById("image")).value = res.body[0].image;
				(<HTMLInputElement>document.getElementById("level")).value = res.body[0].profile.level;
				this.level = res.body[0].profile.level;
				(<HTMLInputElement>document.getElementById("type")).value = res.body[0].profile.type;
				this.type = res.body[0].profile.type;
				this.friends = res.body[0].profile.friends;
				this.pendingFriends = res.body[0].profile.pending_friends;
				this.fandoms = res.body[0].profile.fandoms;
				for (var i=0; i<res.body[0].profile.interests.length; i++){
					this.interests.push(res.body[0].profile.interests[i]);
				}
			},
			err => {
				console.log(err)
				this.router.navigate(['/page-not-found']);
			}
		);
	}

	setType(type){
		if (this.newType != "") this.r.setStyle(document.querySelector("#"+this.newType), "background", "white")
		this.newType = type
		this.r.setStyle(document.querySelector("#"+type), "background", "orange")
	}

	setLevel(level){
		if (this.newLevel != "") this.r.setStyle(document.querySelector("#"+this.newLevel), "background", "white")
		this.newLevel = level
		this.r.setStyle(document.querySelector("#"+level), "background", "orange")
	}

	saveChanges(password, email, bio, age, image, interest) {
		if (this.newType!="" && this.newLevel!=""){
			if (interest != "") this.interests.push(interest)
			var type="", level="";
			if (this.newType!="" && this.newLevel!="") {
				type = this.newType;
				level = this.newLevel
			}
			else if (this.newType=="" && this.newLevel=="") {
				type = this.type;
				level = this.level
			}
			this.userService.updateUser(this.username, email, password, bio, age, image, this.interests, type, level, this.friends, this.pendingFriends, this.fandoms).subscribe(
				res => {
					console.log(res.body);
					if (res.status == 200)
						this.router.navigate(['/profile'], { 'queryParams': { 'user': this.username } })//.then(()=>{window.location.reload()})
				},
				err => {
					console.log(err);
				}
			)
		}
		else{
			alert("Level or Type field is missing!! Both have to be filed")
		}
	}
}
