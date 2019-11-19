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
	constructor(private renderer: Renderer2, private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router, private session: SessionStorageService) { }

	ngAfterViewInit() {
		var userParam = this.route.snapshot.queryParamMap.get('user')
		var user = this.session.retrieve("logged-in")
		if (user != null && (userParam == null || user == userParam)){
			this.userService.getUserByUsername(user).subscribe(
				res => {
					if (res.status == 200){
						this.username = res.body[0].username;
						this.email = res.body[0].email;
						this.age = res.body[0].profile.age;
						this.imagelink = res.body[0].image;
						(<HTMLInputElement>document.getElementById("bio")).value = res.body[0].profile.bio;
					}
					
				},
				err => {
					console.log(err);
				}
			)
		}
		else if (user != userParam){
			this.userService.getUserByUsername(userParam).subscribe(
				res => {
					this.username = res.body[0].username;
					this.email = res.body[0].email;
					this.age = res.body[0].profile.age;
					if (!(res.body[0].profile.friends).includes(user)){
						var r = this.renderer;
						var button = r.createElement("button"); r.appendChild(button, r.createText('Add Friend'));r.setProperty(button, "id", "friendButton")
						this.friendRef.nativeElement.appendChild(button)
						button.addEventListener("click", ()=>{
							r.removeChild(this.friendRef.nativeElement, button)
							var button1 = r.createElement("button"); r.appendChild(button1, r.createText('Linked'));r.setProperty(button1, "id", "friendButton")
							this.friendRef.nativeElement.appendChild(button1)
							console.log(user, userParam)
							this.userService.addFriend(user, userParam).subscribe(res=>{console.log(res.body)},err=>{console.log(err)})
							this.userService.addFriend(userParam, user).subscribe(res=>{console.log(res.body)},err=>{console.log(err)})
						})
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
