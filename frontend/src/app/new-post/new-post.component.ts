import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { UserService } from '../user.service';
import { FandomService } from '../fandom.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  message = "";
  fandoms = ["none-selected"]
  fandom = ""
  body:any
  constructor(private r: Renderer2, private fandomService: FandomService, private userService: UserService, private router:Router, private postService: PostService, private session: LocalStorageService) {
  }

  ngOnInit() {
    this.fandomService.getAllFandoms().subscribe(
      res => {
        console.log(res.body)
        this.body = res.body
        for (var i=0; i<this.body.length; i++){
          this.fandoms.push(this.body[i].name)
        }
      },
      err => {console.log(err)}
    )
  }

  setFandom(name){
    if (this.fandom != "")
      this.r.setStyle(document.querySelector("#"+this.fandom), "background", "white")
    this.fandom = name;
    this.r.setStyle(document.querySelector("#"+name), "background", "orange")
  }

  createPost(title, tags, content, image){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var timestamp = dd + '/' + mm + '/' + yyyy;
    this.message = "";
    if (title!=''&&tags!=''&&content!=''){
      var author = this.session.retrieve('logged-in');
      var comments = []
      var numVotes = 0;
      var userImage = ""
      this.userService.getUserByUsername(author).subscribe(
        res => {
          console.log(res.body[0].image)
          userImage = res.body[0].image
          this.postService.addPost(tags, title, content, image, author, timestamp, comments, numVotes, this.fandom, userImage).subscribe(
            res => {
              if (res.status == 200) {
                console.log("Post succesfully created");
                this.router.navigate(['/posts']);
              }
            },
            err => {
              console.log(err)
              this.router.navigate(['/page-not-found']);
            }
          );
        },
        err => {
          console.log(err)
        }
      )
    }
    else{
      this.message = "some fields are still empty";
    }
  }

}
