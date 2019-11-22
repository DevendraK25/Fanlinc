import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, QueryList, ViewChildren, Inject } from '@angular/core';
import * as $ from 'jquery';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { FandomService } from '../fandom.service';
import { UserService } from '../user.service';
import { fn } from '@angular/compiler/src/output/output_ast';
import { timingSafeEqual } from 'crypto';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit{
  
  posts: any;
  fandoms: any;
  user = ''
  userImages = []
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
  containsImg = []
  categories = ['movies', 'anime', 'tv shows', 'sports']
  
  constructor(private userService:UserService, private fandomService: FandomService, private router: Router, private postService:PostService, private session: LocalStorageService) {}
  
  sortByPopularity(){
    var arr = []
    this.postService.getAllPosts().subscribe(
      res => {
        if (res.status == 200){
          this.posts = res.body;
          for (var i = 0; i < this.posts.length; i++){
            arr.push([this.posts[i].numVotes, i]);
          }
          var sortedPosts = arr.sort((a,b)=>b[0]-a[0])
          for (var i = 0; i < sortedPosts.length; i++){
            this.postNumVotes.push(this.posts[sortedPosts[i][1]].numVotes);
            this.postTitles.push(this.posts[sortedPosts[i][1]].title);
            this.postContents.push(this.posts[sortedPosts[i][1]].content);
            this.userImages.push(this.posts[sortedPosts[i][1]].userImage);
            if (this.posts[sortedPosts[i][1]].image != null)
              this.postImages.push(this.posts[sortedPosts[i][1]].image)
            else{
              this.postImages.push("")
            }
            this.postAuthors.push(this.posts[sortedPosts[i][1]].author);
            this.postTags.push(this.posts[sortedPosts[i][1]].tags);
            this.postNumComments.push(this.posts[sortedPosts[i][1]].comments.length);
            this.postTimestamps.push(this.posts[sortedPosts[i][1]].timestamp);
            this.postIds.push(this.posts[sortedPosts[i][1]]._id);
            this.postFandoms.push(this.posts[sortedPosts[i][1]].fandom);
          }
        }
      },
      err => {
        console.log(err)
        this.router.navigate(['/page-not-found']);
      }
    )
  }

  sortByMostRecent(){

  }

  sortByFandom(){

  }

  ngOnInit(){
    this.user = this.session.retrieve("logged-in")
    this.sortByPopularity();

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
  }

  ngAfterViewInit() {}

  id="";num=0;
  upvote(postId, numVotes){ 
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
		this.router.navigate(['/fandom-page'], {queryParams: {"fandom": fandom}});
	}

  toCommentPg(postId){
    this.router.navigate(['/post-comments'], {queryParams: {postId: postId}})
  }

  toUserProfile(username){
    this.router.navigate(['/profile'], {queryParams: {user: username}})
  }

  toNewPost(){
    if (this.user != null)
      this.router.navigate(['/create-new-post'])
    else{
      if (confirm('Sign in first!'))
        this.router.navigate(['/login'])
    }
  }

  toNewFandom(){
    if (this.user != null)
      this.router.navigate(['/create-new-fandom'])
    else{
      if (confirm('Sign in first!'))
        this.router.navigate(['/login'])
    }
  }

  toFandom(fandom){
    this.router.navigate(['/fandoms'], {queryParams: {fandom:fandom}})
  }

  deletePost(id, author){
    if (author == this.user){
      var username = prompt("Confirm username");
      var password = prompt("Confirm password");
      if (username!=null && password!=null){
        this.postService.deletePost(id).subscribe(
          res => {
            console.log(res.body)
            window.location.reload()
          },
          err => {
            console.log(err)
          }
        )
      }
    }
    else{
      alert("That's not your post!!")
    }
  }
}
