import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FandomService } from '../fandom.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
	selector: 'app-editfandom',
	templateUrl: './editfandom.component.html',
	styleUrls: ['./editfandom.component.css']
})
export class EditfandomComponent implements OnInit {

	image =""
	name=""
	desc=""
	constructor(private fandomService: FandomService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {

		this.name = this.route.snapshot.queryParamMap.get("fandom")
		this.fandomService.getFandom(this.name).subscribe(
			res => {
				console.log(res.body);
				(<HTMLInputElement>document.getElementById("title")).value = res.body[0].name;
				(<HTMLInputElement>document.getElementById("image")).value = res.body[0].image;
				(<HTMLInputElement>document.getElementById("description")).value = res.body[0].description;
			},
			err => {
				console.log(err)
			}
		)
	}

	saveChanges(name, image, desc){
		if (name=="") name = this.name
		this.fandomService.updateFandom(name, image, desc).subscribe(
			res => {
				console.log(res.body)
				this.router.navigate(['/fandom-page'], {queryParams: {fandom: name, sort:'popularity'}})
			},
			err => {console.log(err)}
		)
	}

}