import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  uri = 'http://localhost:8080';
  constructor(private http: HttpClient, private router: Router) { }

  addPost(tags, title, content, image, author, timestamp, comments, numVotes, fandom, userImage) {
    const body = {
      "tags":tags,
      "title":title,
      "content":content,
      "image":image,
      "author":author,
      "timestamp":timestamp,
      "comments":comments,
      "numVotes":numVotes,
      "fandom":fandom,
      "userImage":userImage
    };
    return this.http.post(`${this.uri}/posts/add`, body, {observe: 'response'});
  }

  getAssociatedPosts(fandom_name) {
    return this.http.get(`${this.uri}/posts/allposts/${fandom_name}`, {observe: 'response'});
  }

  getAllPosts() {
    return this.http.get(`${this.uri}/posts`, {observe: 'response'});
  }

  getPost(id) {
    return this.http.get(`${this.uri}/posts/${id}`, {observe: 'response'});
  }

  addComment(id, newComment, author){
    return this.http.post(`${this.uri}/posts/addComment/${id}`, {"newComment":newComment,"author":author}, {observe: 'response'});
  }

  setNumVotes(id, numVotes){
    return this.http.post(`${this.uri}/posts/setNumVotes/${id}`, {"numVotes":numVotes}, {observe: 'response'});
  }

  updatePost(id, title, author, timestamp, numVotes){
    const body = {
      title:title,
      author:author,
      timestamp:timestamp,
      numVotes:numVotes
    }
    return this.http.post(`${this.uri}/posts/update/${id}`, body, {observe: 'response'});
  }

  setUserImage(id, image){
    return this.http.post(`${this.uri}/posts/setUserImage/${id}`, {image: image}, {observe: 'response'});
  }

  deletePost(id){
    return this.http.delete(`${this.uri}/posts/delete/${id}`, {observe: 'response'});
  }

}
