import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FandomService } from '../fandom.service';

@Component({
	selector: 'app-editfandom',
	templateUrl: './editfandom.component.html',
	styleUrls: ['./editfandom.component.css']
})
export class EditfandomComponent implements OnInit {
	username = "";
	password = "";
	email = "";
	bio = "";
	age = "";
	image ="";
	constructor(private fandomService: FandomService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {}
}