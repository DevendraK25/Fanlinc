import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { $ } from 'protractor';


@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
	ngOnInit(): void {}

	@ViewChild("friend", {static:false}) friendRef: ElementRef

	user = ""
	username = ""
	email = "";
	age = "";
	imagelink = "";
	bio = ""
	isShow = false;
	isLinked = false
	friendB = ""
	constructor(private renderer: Renderer2, private userService: UserService, private route: ActivatedRoute, private router: Router, private session: SessionStorageService) { }

	ngAfterViewInit() {
		var userParam = this.route.snapshot.queryParamMap.get('user')
		this.user = this.session.retrieve("logged-in")
		if (this.user == userParam){
			this.userService.getUserByUsername(this.user).subscribe(
				res => {
					if (res.status == 200){
						this.username = res.body[0].username
						this.email = res.body[0].email;
						this.age = res.body[0].profile.age;
						this.imagelink = res.body[0].image;
						this.bio = res.body[0].profile.bio;
					}			
				},
				err => {
					console.log(err);
					this.router.navigate(['/page-not-found']);
				}
			)
		}
		else if (this.user != userParam){
			this.isShow = !this.isShow
			this.userService.getUserByUsername(userParam).subscribe(
				res => {
					this.username = res.body[0].username
					this.email = res.body[0].email;
					this.age = res.body[0].profile.age;
					this.imagelink = res.body[0].image;
					this.bio = res.body[0].profile.bio;
					if (!(res.body[0].profile.friends).includes(this.user)){
						if (this.route.snapshot.queryParamMap.get('req'))
							this.friendB = "Accept Friend Request"
						else
							this.friendB = "Add Friend"
					}
					else{
						this.friendB = 'Linked'
						this.isShow = !this.isShow;
						this.isLinked = !this.isLinked;
					}			
				},
				err => {
					console.log(err);
					this.router.navigate(['/page-not-found']);
				}
			)

		}
	}

	addPending(user, toBeAdded){
		
	}

	redirectToEditProfile() {
		this.router.navigate(['/editprofile'], { 'queryParams': { 'user': this.user } });
	}

	addFriendClicked(toBeAdded){
		if (this.friendB == 'Add Friend'){
			this.friendB = "Friend Request Sent";
			this.userService.addPending(toBeAdded, this.user).subscribe(res=>{console.log(res.body)},err=>{console.log(err)})
		}
		else if (this.friendB == 'Accept Friend Request'){
			this.userService.addFriend(this.user, toBeAdded).subscribe(res=>{console.log(res.body)},err=>{console.log(err)})
			this.userService.addFriend(toBeAdded, this.user).subscribe(res=>{console.log(res.body)},err=>{console.log(err)})
			this.userService.removePending(this.user, toBeAdded).subscribe(res=>{console.log(res.body);window.location.reload()},err=>{console.log(err)})
		}
	}

}
