import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FandomService } from '../fandom.service';
@Component({
	selector: 'app-fandom-page',
	templateUrl: './fandom.component.html',
	styleUrls: ['./fandom.component.css']
})
export class FandomComponent implements OnInit {
	name = "";
	posts = [];
	subcount = 0;
	desc = ""
	admin = "";
	mods = [];
	events = [];
	image = "";
	constructor(private route: ActivatedRoute, private router: Router, private fandomService: FandomService) { }

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

}
