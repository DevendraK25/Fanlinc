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
			image: "https://hockeydev2.wpengine.com/wp-content/uploads/2019/08/Default-Profile.png",
			profile: {
				type: "general fan",
				level: "limited"
			}
		};
		return this.http.post(`${this.uri}/users/add`, user, { observe: 'response' });
	}

	updateUser(username, email, password, bio, age, image, interests, type, level, friends, pendingF, fandoms, subscribed) {
		const user = {
			username: username,
			email: email,
			password: password,
			profile: {
				type: type,
				level: level,
				bio: bio,
				age: age,
				interests: interests,
				friends: friends, 
				pending_friends: pendingF, 
				fandoms: fandoms,
				subscribed: subscribed
			},
			image: image
		};
		return this.http.post(`${this.uri}/users/update/${username}`, user, {observe: 'response'});
	}

	addPending(username, friend) {
		return this.http.post(`${this.uri}/users/addPending/${username}`, {friend: friend}, {observe: 'response'});
	}

	removePending(username, friend) {
		return this.http.post(`${this.uri}/users/removePending/${username}`, {friend: friend}, {observe: 'response'});
	}

	addFriend(username, friend) {
		return this.http.post(`${this.uri}/users/addfriend/${username}`, {friend: friend}, {observe: 'response'});
	}

	removeFriend(username, friend) {
		return this.http.post(`${this.uri}/users/unfriend/${username}`, {friend: friend}, {observe: 'response'});
	}
	
	// deleteUser(username) {
	// 	return this.http.delete(`${this.uri}/users/delete/${username}`);
	// }

	subscribe(username, fandom){
		return this.http.post(`${this.uri}/users/subscribe/${username}`, {fandom: fandom}, {observe: 'response'});
	}

	unsubscribe(username, fandom){
		return this.http.post(`${this.uri}/users/unsubscribe/${username}`, {fandom: fandom}, {observe: 'response'});
	}
}
