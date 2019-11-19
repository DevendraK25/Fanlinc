import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  uri = 'http://localhost:8080';
  constructor(private http: HttpClient, private router: Router) { }

  addPost(tags, title, content, image, author, timestamp, comments, numVotes) {
    const body = {
      "tags":tags,
      "title":title,
      "content":content,
      "image":image,
      "author":author,
      "timestamp":timestamp,
      "comments":comments,
      "numVotes":numVotes
    };
    return this.http.post(`${this.uri}/posts/add`, body, {observe: 'response'});
  }

  getAllPosts() {
    return this.http.get(`${this.uri}/posts`, {observe: 'response'});
  }

  getPost(id) {
    return this.http.get(`${this.uri}/posts/${id}`, {observe: 'response'});
  }

  setComments(id, newComment){
    return this.http.post(`${this.uri}/posts/setComments/${id}`, {"newComment":newComment}, {observe: 'response'});
  }

  setNumVotes(id, numVotes){
    return this.http.post(`${this.uri}/posts/setNumVotes/${id}`, {"numVotes":numVotes}, {observe: 'response'});
  }

}
