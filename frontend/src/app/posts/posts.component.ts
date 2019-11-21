import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, QueryList, ViewChildren, Inject } from '@angular/core';
import * as $ from 'jquery';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { LoginComponent } from '../login/login.component';
import { FandomService } from '../fandom.service';
import { UserService } from '../user.service';

@Component({
	selector: 'app-fandom',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit{
  
  posts: any;
  fandoms: any;
  postImages = []
  postTags = []
  postIds = []
  postTitles = []
  postAuthors = []
  postContents = []
  postTimestamps = []
  postNumVotes = []
  postFandoms = []
  postNumComments = []
	fandomNames = [];
	fandomImages = [];
  categories = ['movies', 'anime', 'tv shows', 'sports']
  constructor(private userService:UserService, private fandomService: FandomService, private el: ElementRef, private router: Router, private postService:PostService, private session: SessionStorageService, private renderer: Renderer2) {}

  ngOnInit(){
    this.postService.getAllPosts().subscribe(
      res => {
        if (res.status == 200){
          this.posts = res.body;
          // console.log(this.posts)
          for (var i = 0; i < this.posts.length; i++){
            this.postTitles.push(this.posts[i].title);
            this.postContents.push(this.posts[i].content);
            this.userService.getUserByUsername(this.posts[i].author).subscribe(
              res => {
                this.postImages.push(res.body[0].image)
              },
              err => {
                console.log(err)
              }
            )
            this.postAuthors.push(this.posts[i].author);
            this.postTags.push(this.posts[i].tags);
            this.postNumComments.push(this.posts[i].comments.length);
            this.postTimestamps.push(this.posts[i].timestamp);
            this.postNumVotes.push(this.posts[i].numVotes);
            this.postIds.push(this.posts[i]._id);
            this.postFandoms.push(this.posts[i].fandom);
          }
        }
      },
      err => {
        console.log(err)
        this.router.navigate(['/page-not-found']);
      }
    )

    this.fandomService.getAllFandoms().subscribe(
      res => {
        if (res.status == 200) {
          this.fandoms = res.body;
          for (var i = 0; i < this.fandoms.length; i++){
            this.fandomNames.push(this.fandoms[i].name);
            this.fandomImages.push(this.fandoms[i].image);
          }
        }
      },
      err => {
        console.log(err)
        this.router.navigate(['/page-not-found']);
      }
    );
    console.log(this.fandomImages)
  }

  ngAfterViewInit() {}

  id="";num=0;
  upvote(postId, numVotes){ 
    console.log(postId, numVotes, "up")
    var numVotes1 = parseInt(numVotes)
    if (this.id == ""){ //first post clicked
      this.id = postId
      this.num = numVotes1+1;
      $("#"+postId).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
    else if (this.id == postId){//same post clicked
      this.num += 1;
      $("#"+postId).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
    else { //different post
      this.id = postId
      this.num = numVotes1+1
      $("#"+postId).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
  }

  downvote(postId, numVotes){
    console.log(postId, numVotes, "down")
    var numVotes1 = parseInt(numVotes)
    if (this.id == ""){ //first post clicked
      this.id = postId
      this.num = numVotes1-1;
      $("#"+postId).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
    else if (this.id == postId){ //same post clicked
      this.num -= 1;
      $("#"+postId).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
    else { //different post
      this.id = postId
      this.num = numVotes1-1
      $("#"+postId).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
  }

	redirectToFandom(fandom){
    console.log(fandom)
		this.router.navigate(['/fandoms'], {queryParams: {"fandom": fandom}});
	}

  toCommentPg(postId){
    this.router.navigate(['/post-comments'], {queryParams: {postId: postId}})
  }

  toUserProfile(username){
    this.router.navigate(['/profile'], {queryParams: {user: username, cond:false}})
  }

  toNewPost(){
    var user = this.session.retrieve('logged-in');
    if (user != null)
      this.router.navigate(['/create-new-post'])
    else{
      alert('Sign in first!')
      this.router.navigate(['/login'])
    }
  }

  toNewFandom(){
    var user = this.session.retrieve('logged-in');
    if (user != null)
      this.router.navigate(['/create-new-fandom'])
    else{
      alert('Sign in first!')
      this.router.navigate(['/login'])
    }
  }

  toFandom(fandom){
    this.router.navigate(['/fandoms'], {queryParams: {fandom:fandom}})
  }

  toFullFandomsPg(){
    console.log("ok")
  }
}