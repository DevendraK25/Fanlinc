import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.uri}/users`);
  }

  getUserByUsername(username) {
    return this.http.get(`${this.uri}/users/${username}`);
  }

  addUser(username, firstname, lastname, password, email) {
    const user = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email
    };
    return this.http.post(`${this.uri}/users/add`, user);
  }

  updateUser(username, firstname, lastname, password, email) {
    const user = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email
    };
    return this.http.post(`${this.uri}/users/update/${username}`, user);
  }

  deleteUser(username) {
    return this.http.get(`${this.uri}/users/delete/${username}`);
  }
}
