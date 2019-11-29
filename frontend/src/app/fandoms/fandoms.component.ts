import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FandomService } from '../fandom.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { $ } from 'protractor';

@Component({
	selector: 'app-fandoms',
	templateUrl: './fandoms.component.html',
	styleUrls: ['./fandoms.component.css']
})
export class FandomsComponent implements OnInit {

	fandoms: any
	fandomNames = []
	fandomImages = []
	fandomDesc = []
	fandomSubcounts = []

	constructor(private route: ActivatedRoute, private router: Router, private fandomService: FandomService, private session: LocalStorageService) { }

    ngOnInit() {
		this.fandomService.getAllFandoms().subscribe(
			res => {
				console.log(res.body)
				this.fandoms = res.body
				var arr = []
				for (var i = 0; i < this.fandoms.length; i++){
				  arr.push([this.fandoms[i].name, i]);
				}
				var sortedFandoms = arr.sort()
				for (var i = 0; i < sortedFandoms.length; i++){
					this.fandomNames.push(this.fandoms[sortedFandoms[i][1]].name)
					this.fandomImages.push(this.fandoms[sortedFandoms[i][1]].image)
					this.fandomDesc.push(this.fandoms[sortedFandoms[i][1]].description)
					this.fandomSubcounts.push(this.fandoms[sortedFandoms[i][1]].subcount)
				}
			},
			err => {
				console.log(err)
			}
		)
	}

	createFandom(name, desc) {
        if (name != '' && desc != '') {
            this.fandomService.addFandom(name, desc, this.session.retrieve('logged-in')).subscribe(
                res => {
                    if (res.status == 200) {
                        console.log(res.body);
                        this.router.navigate(['/fandom-page'], {queryParams: {fandom: name}});
                    }
                },
                err => {
                    console.log(err);
                    this.router.navigate(['/page-not-found']);
                }
            );
        }
        else {
            alert("some fields are still missing")
        }
    }

	toFandomPg(name){
		this.router.navigate(['/fandom-page'], {queryParams: {fandom: name, sort:"popularity"}})
	}
}