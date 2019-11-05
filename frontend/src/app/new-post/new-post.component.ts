import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  form:FormGroup;
  message = "hello";
  constructor(private router:Router, private postService: PostService) {
  }

  ngOnInit() {
  }
  // createPost(tags, title, content, image, author, date, comments, numVotes){
  createPost(title, fandom, tags, content){
    this.message = "";
    // if (tags!=''&&title!=''&&content!=''&&image!=''&&author!=''&&date!=''&&comments!=''&&numVotes!=''){
      if (title!=''&&fandom!=''&&tags!=''&&content!=''){
      // this.postService.createPost(tags, title, content, image, author, date, comments, numVotes).subscribe(
        this.postService.createPost(title, fandom, tags, content).subscribe(
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
