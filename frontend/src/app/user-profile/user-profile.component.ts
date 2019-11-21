import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
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
export class UserProfileComponent implements OnInit, AfterViewInit {
	ngOnInit(): void {}

	@ViewChild("friend", {static:false}) friendRef: ElementRef

	form: FormGroup;
	username = "";
	email = "";
	age = "";
	imagelink = "";
	bio=""
	isShow=false;
	friendB=""
	constructor(private renderer: Renderer2, private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router, private session: SessionStorageService) { }

	ngAfterViewInit() {
		var userParam = this.route.snapshot.queryParamMap.get('user')
		var user = this.session.retrieve("logged-in")
		if (user == userParam){
			this.userService.getUserByUsername(user).subscribe(
				res => {
					if (res.status == 200){
						this.username = res.body[0].username;
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
		else if (user != userParam && this.route.snapshot.queryParamMap.get('cond')){
			this.isShow = !this.isShow
			this.userService.getUserByUsername(userParam).subscribe(
				res => {
					this.username = res.body[0].username;
					this.email = res.body[0].email;
					this.age = res.body[0].profile.age;
					this.imagelink = res.body[0].image;
					this.bio = res.body[0].profile.bio;
					if (!(res.body[0].profile.friends).includes(user)){
						this.friendB = "Add Friend"
					}
					else{
						this.friendB = 'Linked'
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
		if (this.friendB != 'Linked'){
			this.friendB = "Friend Request Sent";
			this.userService.addPending(user, toBeAdded).subscribe(res=>{console.log(res.body)},err=>{console.log(err)})
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
