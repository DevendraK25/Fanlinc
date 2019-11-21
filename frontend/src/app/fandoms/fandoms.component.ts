import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FandomService } from '../fandom.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
	selector: 'app-fandoms',
	templateUrl: './fandoms.component.html',
	styleUrls: ['./fandoms.component.css']
})
export class FandomsComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router, private fandomService: FandomService, private session: SessionStorageService) { }

    ngOnInit() {}
}