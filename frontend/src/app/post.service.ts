import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  uri = 'http://localhost:8080';
  constructor(private http: HttpClient, private router: Router) { }

  createPost(tags, title, content, image, author, timestamp, comments, numVotes, fandom) {
    const post = {
      "tags":tags,
      "title":title,
      "content":content,
      "image":image,
      "author":author,
      "timestamp":timestamp,
      "comments":comments,
      "numVotes":numVotes,
      "fandom":fandom
    };
    return this.http.post(`${this.uri}/posts/add`, post, {observe: 'response'});
  }

  getAllPosts() {
    return this.http.get(`${this.uri}/posts`, {observe: 'response'});
  }

}
