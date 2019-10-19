import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
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
    return this.http.get(`${this.uri}/users/${username}/${password}`, {observe: 'response'});
  }

  addUser(username, email, password) {
    const user = {
      username: username,
      email: email,
      password: password 
    };
    return this.http.post(`${this.uri}/users/add`, user, {observe: 'response'});
  }

  updateUser(username, email, password) {
    const user = {
      username: username,
      email: email,
      password: password      
    };
    return this.http.post(`${this.uri}/users/update/${username}`, user);
  }

  deleteUser(username) {
    return this.http.get(`${this.uri}/users/delete/${username}`);
  }
}
