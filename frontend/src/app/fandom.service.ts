import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class FandomService {
	uri = 'http://localhost:8080';
	constructor(private http: HttpClient, private router: Router) { }
	//getAllFandoms() {
		//return this.http.get(`${this.uri}/fandoms`);
	//}
	
	getFandom(name) {
		return this.http.get(`${this.uri}/fandom/${name}`, { observe: 'response' });
	}
	getAllFandoms(){
		return this.http.get(`${this.uri}/fandom/getAllFandoms`, { observe: 'response' });
	}
	addFandom(name) {
		const fandom = {
			image: "https://via.placeholder.com/100.jpg",
			name: name,
			posts: [],
			subcount: 0,
			admin: "",
			mods: [],
			events: []
		};
		return this.http.post(`${this.uri}/fandom/add`, fandom, { observe: 'response' });
	}

	updateFandom(name, posts, subcount, admin, mods,events,image) {
		const fandom = {
			image: image,
			name: name,
			posts: posts,
			subcount: subcount,
			admin: admin,
			mods: mods,
			events: events
		};
		return this.http.post(`${this.uri}/fandom/update/${name}`, fandom, { observe: 'response' });
	}

	deleteUser(name) {
		return this.http.get(`${this.uri}/fandom/delete/${name}`);
	}
}

