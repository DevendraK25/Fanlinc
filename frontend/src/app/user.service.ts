import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	uri = 'http://localhost:8080';
	constructor(private http: HttpClient, private router: Router) { }

	getAllUsers() {
		return this.http.get(`${this.uri}/users`);
	}

	getUser(username, password) {
		return this.http.get(`${this.uri}/users/${username}/${password}`, { observe: 'response' });
	}

	getUserByUsername(username) {
		return this.http.get(`${this.uri}/users/${username}`, { observe: 'response' });
	}

	addUser(username, email, password) {
		const user = {
			username: username,
			email: email,
			password: password,
			image: "https://via.placeholder.com/100.jpg"
		};
		return this.http.post(`${this.uri}/users/add`, user, { observe: 'response' });
	}

	updateUser(username, email, password, bio, age, image) {
		const user = {
			username: username,
			email: email,
			password: password,
			profile: {
				bio: bio,
				age: age
			},
			image: image
		};
		return this.http.post(`${this.uri}/users/update/${username}`, user, {observe: 'response'});
	}

	deleteUser(username) {
		return this.http.get(`${this.uri}/users/delete/${username}`);
	}
}
