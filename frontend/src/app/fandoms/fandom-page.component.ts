import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FandomService } from '../fandom.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { UserService } from '../user.service';

@Component({
	selector: 'app-fandom-page',
	templateUrl: './fandom-page.component.html',
	styleUrls: ['./fandom-page.component.css']
})
export class FandomPageComponent implements OnInit {
	user = ""
	name = "";
	posts = [];
	subcount = 0;
	desc = ""
	admin = "";
	mods = [];
	events = [];
	image = "";
	id = ""
	followB = "follow"
	adminB = "admin"
	showAdminB = false
	showFollowB = true
	showUnfollowB = false
	showB = false
	constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private fandomService: FandomService, private session: LocalStorageService) { }

	ngOnInit() {
		this.user = this.session.retrieve('logged-in')
		this.fandomService.getFandom(this.route.snapshot.queryParamMap.get("fandom")).subscribe(
			res => {
				console.log(res.body)
				if (res.status == 200){
					this.name = res.body[0].name
					this.posts = res.body[0].posts;
					this.desc = res.body[0].description
					this.subcount = res.body[0].subcount;
					this.admin = res.body[0].admin;
					this.mods = res.body[0].mods;
					this.events = res.body[0].events;
					this.image = res.body[0].image;
					this.id = res.body[0]._id;
					if (this.admin == this.user) {
						this.showFollowB = !this.showFollowB
						this.showB = !this.showB
						this.showAdminB = !this.showAdminB
					}
					this.userService.getUserByUsername(this.user).subscribe(
						res => {
							if ((res.body[0].profile.subscribed).includes(this.name)) {
								this.followB = "unfollow"
								this.showFollowB = !this.showFollowB;
								this.showUnfollowB = !this.showUnfollowB;
							}
						},
						err => {console.log(err)}
					)
				}
			},
			err => {
				console.log(err)
				this.router.navigate(['/page-not-found']);
			}
		)
	}

	toUserProfile(username){
		this.router.navigate(['/profile'], {queryParams: {user: username}})
	}

	subscribe(fandom){	
		this.userService.subscribe(this.user, fandom).subscribe(
			res => {
				console.log(res.body)
				this.followB = "unfollow";
				this.showFollowB = !this.showFollowB;
				this.showUnfollowB = !this.showUnfollowB;
				this.fandomService.setSubCount(this.name, this.subcount+1).subscribe(
					res => {
						console.log(res.body)
					},
					err => {console.log(err)}
				)
			},
			err => {
				console.log(err)
			}
		)
	}

	unsubscribe(fandom){
		this.userService.unsubscribe(this.user, fandom).subscribe(
			res => {
				console.log(res.body)
				this.followB = "follow";
				this.showFollowB = !this.showFollowB;
				this.showUnfollowB = !this.showUnfollowB;
				this.fandomService.setSubCount(this.name, this.subcount-1).subscribe(
					res => {
						console.log(res.body)
					},
					err => {console.log(err)}
				)
			},
			err => {
				console.log(err)
			}
		)
	}

	toEditFandom(){
		if (this.admin == this.user){
			var username = prompt("Confirm username");
			var password = prompt("Confirm password");
			if (username!=null && password!=null){
				this.router.navigate(['/editfandom'], {queryParams: {id: this.id}})
			}
		}
		else {
			alert("You are not the admin of this fandom!!")
		}
	}

	deleteFandom(){
		if (this.admin == this.user){
		  var username = prompt("Confirm username");
		  var password = prompt("Confirm password");
		  if (username!=null && password!=null){
			this.fandomService.deleteFandom(this.id).subscribe(
			  res => {
				console.log(res.body)
				this.router.navigate(['/posts'])
			  },
			  err => {
				console.log(err)
			  }
			)
		  }
		}
		else{
		  alert("You are not the admin of this fandom!!")
		}
	}
}
