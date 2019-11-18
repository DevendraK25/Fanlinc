import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FandomService {
    uri = 'http://localhost:8080';
    constructor(private http: HttpClient, private router: Router) { }
    
    createFandom(name, posts, subcount, admin, mods, events) {
        const fandom = {
            "name":name,
            "posts":posts,
            "subcount":subcount,
            "admin":admin,
            "mods":mods,
            "events":events
        };
        return this.http.post(`${this.uri}/fandoms/add`, fandom, {observe: 'response'});
    }

    getAllFandoms() {
        return this.http.get(`${this.uri}/fandoms`, {observe: 'response'});
    }
}