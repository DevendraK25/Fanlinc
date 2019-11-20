import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  form:FormGroup;
  message = "hello";
  constructor(private router:Router, private postService: PostService, private session: SessionStorageService) {
  }

  ngOnInit() {
  }
  // createPost(tags, title, content, image, author, date, comments, numVotes){
  createPost(title, tags, content, fandom, image){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var date = dd + '/' + mm + '/' + yyyy;
    this.message = "";
    // if (tags!=''&&title!=''&&content!=''&&image!=''&&author!=''&&date!=''&&comments!=''&&numVotes!=''){
    if (title!=''&&tags!=''&&content!=''){
      var tags1 = [];
      tags1.push(tags);
      if (image == "") {
        image = 'https://via.placeholder.com/100.jpg';
      }
      var author = this.session.retrieve("logged-in");
      var comments = []
      var numVotes = 0;
      this.postService.addPost(tags1, title, content, image, author, date, comments, numVotes, fandom).subscribe(
        // this.postService.createPost(title, fandom, tags, content).subscribe(
        res => {
          if (res.status == 200) {
            console.log("Post succesfully created");
            this.router.navigate(['/fandoms']);
          }
        },
        err => {
        }
      );
    }
    else{
      this.message = "some fields are still empty";
    }
  }

}
