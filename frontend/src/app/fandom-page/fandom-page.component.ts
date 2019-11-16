import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FandomService } from '../fandom.service';
@Component({
	selector: 'app-fandom-page',
	templateUrl: './fandom-page.component.html',
	styleUrls: ['./fandom-page.component.css']
})
export class FandomPageComponent implements OnInit {
	name = "";
	posts = [];
	subcount = 0;
	admin = "";
	mods = [];
	events = [];
	image = "";
	constructor(private route: ActivatedRoute, private router: Router, private fandomService: FandomService) { }

	ngOnInit() {
		this.route.params.forEach((urlParams) => {
			this.name = urlParams['name'];
		});
		this.fandomService.getFandom(name).subscribe(
			res => {
				if (res.status == 200){
					this.posts = res.body[0].posts;
					this.subcount = res.body[0].subcount;
					this.admin = res.body[0].admin;
					this.mods = res.body[0].mods;
					this.events = res.body[0].events;
					this.events = res.body[0].image;
				}
					
			},
			err => {
				this.router.navigate(['/page-not-found']);
			}
		)
	}

}
