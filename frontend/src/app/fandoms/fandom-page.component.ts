import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FandomService } from '../fandom.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
	selector: 'app-fandom-page',
	templateUrl: './fandom-page.component.html',
	styleUrls: ['./fandom-page.component.css']
})
export class FandomPageComponent implements OnInit {
	name = "";
	posts = [];
	subcount = 0;
	desc = ""
	admin = "";
	mods = [];
	events = [];
	image = "";
	id = ""
	constructor(private route: ActivatedRoute, private router: Router, private fandomService: FandomService, private session: SessionStorageService) { }

	ngOnInit() {
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
				}
			},
			err => {
				console.log(err)
				this.router.navigate(['/page-not-found']);
			}
		)
	}

	toUserProfile(username){
		this.router.navigate(['/profile'], {queryParams: {user: username, cond:false}})
	}

	subscribe(){
		
	}

	toEditFandom(){
		if (this.admin == this.session.retrieve('logged-in')){
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
		if (this.admin == this.session.retrieve('logged-in')){
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
