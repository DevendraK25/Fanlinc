import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
	ngOnInit(): void {}

	@ViewChild("friend", {static:false}) friendRef: ElementRef

	user = ""
	level = ""
	type = ""
	username = ""
	email = "";
	age = "";
	imagelink = "";
	bio = ""
	interests = []
	fandoms = []
	friends = []
	isShow = false;
	isLinked = false
	friendB = ""
	constructor(private renderer: Renderer2, private userService: UserService, private route: ActivatedRoute, private router: Router, private session: LocalStorageService) { }

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
						this.level = res.body[0].profile.level;
						this.type = res.body[0].profile.type;
						for (var i=0; i<res.body[0].profile.interests.length; i++){
							this.interests.push(res.body[0].profile.interests[i])
						}
						for (var i=0; i<res.body[0].profile.friends.length; i++){
							this.friends.push(res.body[0].profile.friends[i])
						}
						for (var i=0; i<res.body[0].profile.subscribed.length; i++){
							this.fandoms.push(res.body[0].profile.subscribed[i])
						}
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
					this.level = res.body[0].profile.level;
					this.type = res.body[0].profile.type;
					for (var i=0; i<res.body[0].profile.interests.length; i++){
						this.interests.push(res.body[0].profile.interests[i])
					}
					for (var i=0; i<res.body[0].profile.friends.length; i++){
						this.friends.push(res.body[0].profile.friends[i])
					}
					for (var i=0; i<res.body[0].profile.subscribed.length; i++){
						this.fandoms.push(res.body[0].profile.subscribed[i])
					}
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

	redirectToEditProfile() {
		this.router.navigate(['/editprofile'], { 'queryParams': { 'user': this.user } });
	}

	addFriendClicked(toBeAdded){
		if (this.user != null && this.user != ""){
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
		else {
			if (confirm("Sign in first!!"))
				this.router.navigate(['/login'])
		}
	}

	toUserProfile(username){
		this.router.navigate(['/profile'], {queryParams: {user: username}}).then(()=>{window.location.reload()})
	}

	toFandomPg(fandom){
		console.log(fandom)
		this.router.navigate(['/fandom-page'], {queryParams: {fandom: fandom}})
	}

	logout(){
		this.session.store("logged-in", "");
		this.router.navigate(['/login']).then(() => {window.location.reload()})
	}

}
