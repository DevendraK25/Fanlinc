import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  uri = 'http://localhost:8080';
  constructor(private http: HttpClient, private router: Router) { }

  createPost(title, fandom, tags, content) {
    const post = {
      title:title,
      fandom:fandom,
      tags:tags,
      content:content 
    };
    return this.http.post(`${this.uri}/posts/add`, post, {observe: 'response'});
  }

}
