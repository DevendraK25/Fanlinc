import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FandomService } from '../fandom.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { UserService } from '../user.service';
import { PostService } from '../post.service';
import * as $ from 'jquery';

@Component({
	selector: 'app-fandom-page',
	templateUrl: './fandom-page.component.html',
	styleUrls: ['./fandom-page.component.css']
})
export class FandomPageComponent implements OnInit {
	user = ""
	name = "";
	subcount = 0;
	desc = ""
	admin = "";
	mods = [];
	events = [];
	image = "";
	id = ""
	followB = "follow"
	adminB = "admin"
	showAdminB = false
	showFollowB = true
	showUnfollowB = false
	showB = false

	posts: any;
	fandoms: any;
	postsByFandom = []
	postHeader = ""
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
	fandomNames1 = ['none-selected'];
	fandomImages = [];
	containsImg = []
	fandom = ""
	comments = []
	checkPopularity = false;
	checkMostRecent = false;
	categories = ['movies', 'anime', 'tv shows', 'sports']
	constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private fandomService: FandomService, private session: LocalStorageService,
		private postService: PostService) { }

	ngOnInit() {
		this.user = this.session.retrieve('logged-in')
		this.fandomService.getFandom(this.route.snapshot.queryParamMap.get("fandom")).subscribe(
			res => {
				console.log(res.body)
				if (res.status == 200){
					this.name = res.body[0].name
					this.desc = res.body[0].description
					this.subcount = res.body[0].subcount;
					this.admin = res.body[0].admin;
					this.mods = res.body[0].mods;
					this.events = res.body[0].events;
					this.image = res.body[0].image;
					this.id = res.body[0]._id;
					if (this.admin == this.user) {
						this.showFollowB = !this.showFollowB
						this.showB = !this.showB
						this.showAdminB = !this.showAdminB
					}
					this.userService.getUserByUsername(this.user).subscribe(
						res => {
							if ((res.body[0].profile.subscribed).includes(this.name)) {
								this.followB = "unfollow"
								this.showFollowB = !this.showFollowB;
								this.showUnfollowB = !this.showUnfollowB;
							}
						},
						err => {console.log(err)}
					)
				}
			},
			err => {
				console.log("nani")
				this.router.navigate(['/page-not-found']);
			}
		)
		this.postService.getAssociatedPosts(this.route.snapshot.queryParamMap.get("fandom")).subscribe(
			res => {
				if (res.status == 200) {
					this.posts = res.body;	
					  if (this.route.snapshot.queryParamMap.get("fandom")){
						this.postHeader = "Popular posts related to "+ this.route.snapshot.queryParamMap.get("fandom")
						this.sortByFandomImp(this.route.snapshot.queryParamMap.get("fandom"), "popularity");
					  }
					  else {
						this.postHeader = "Popular posts"
						this.sortByPopularityImp();
					  }
				}
			},
			err => {}
		)
	}

	toSortedPostPg(){
		if (this.checkMostRecent){
		  if (this.fandom == "" || this.fandom == "none-selected"){
			this.router.navigate(['/posts'], {queryParams: {sort: "most-recent"}}).then(()=>{window.location.reload()})
		  }
		  else {
			this.router.navigate(['/posts'], {queryParams: {sort: "most-recent", fandom: this.fandom}}).then(()=>{window.location.reload()})
		  }
		}
		else if (this.checkPopularity){
		  if (this.fandom == "" || this.fandom == "none-selected"){
			this.router.navigate(['/posts'], {queryParams: {sort: "popularity"}}).then(()=>{window.location.reload()})
		  }
		  else {
			this.router.navigate(['/posts'], {queryParams: {sort: "popularity", fandom: this.fandom}}).then(()=>{window.location.reload()})
		  }
		}
		else {
		  alert("Select a sort option!!")
		}
	  }
	
	  sortByPopularityImp(){
		var arr = []
		for (var i = 0; i < this.posts.length; i++){
		  arr.push([this.posts[i].numVotes, i]);
		}
		var sortedPosts = arr.sort((a,b) => b[0]-a[0])
		for (var i = 0; i < sortedPosts.length; i++){
		  this.postNumVotes.push(this.posts[sortedPosts[i][1]].numVotes);
		  this.postTitles.push(this.posts[sortedPosts[i][1]].title);
		  this.postContents.push(this.posts[sortedPosts[i][1]].content);
		  this.userImages.push(this.posts[sortedPosts[i][1]].userImage);
		  if (this.posts[sortedPosts[i][1]].image != null)
			this.postImages.push(this.posts[sortedPosts[i][1]].image)
		  else {
			this.postImages.push("")
		  }
		  this.postAuthors.push(this.posts[sortedPosts[i][1]].author);
		  this.postTags.push(this.posts[sortedPosts[i][1]].tags);
		  this.postNumComments.push(this.posts[sortedPosts[i][1]].comments.length);
		  if (this.posts[sortedPosts[i][1]].comments.length <= 1) this.comments.push("comment")
		  else this.comments.push("comments")
		  this.postTimestamps.push(this.timeDifference((new Date().getTime()), this.posts[sortedPosts[i][1]].timestamp));
		  this.postIds.push(this.posts[sortedPosts[i][1]]._id);
		  this.postFandoms.push(this.posts[sortedPosts[i][1]].fandom);
		}
	  }
	
	  sortByMostRecentImp(){
		console.log(this.posts)
		var arr = []
		for (var i = 0; i < this.posts.length; i++){
		  arr.push([this.posts[i].timestamp, i]);
		}
		var sortedPosts = arr.sort((a,b) => b[0]-a[0])
		for (var i = 0; i < sortedPosts.length; i++){
		  this.postNumVotes.push(this.posts[sortedPosts[i][1]].numVotes);
		  this.postTitles.push(this.posts[sortedPosts[i][1]].title);
		  this.postContents.push(this.posts[sortedPosts[i][1]].content);
		  this.userImages.push(this.posts[sortedPosts[i][1]].userImage);
		  if (this.posts[sortedPosts[i][1]].image != null)
			this.postImages.push(this.posts[sortedPosts[i][1]].image)
		  else {
			this.postImages.push("")
		  }
		  this.postAuthors.push(this.posts[sortedPosts[i][1]].author);
		  this.postTags.push(this.posts[sortedPosts[i][1]].tags);
		  this.postNumComments.push(this.posts[sortedPosts[i][1]].comments.length);
		  if (this.posts[sortedPosts[i][1]].comments.length <= 1) this.comments.push("comment")
		  else this.comments.push("comments")
		  this.postTimestamps.push(this.timeDifference((new Date().getTime()), this.posts[sortedPosts[i][1]].timestamp));
		  this.postIds.push(this.posts[sortedPosts[i][1]]._id);
		  this.postFandoms.push(this.posts[sortedPosts[i][1]].fandom);
		}
	  }
	
	  sortByFandomImp(name, cond){
		for (var i = 0; i < this.posts.length; i++){
		  if (this.posts[i].fandom == name){
			this.postsByFandom.push(this.posts[i]);
		  }
		}
		this.posts = this.postsByFandom
		if (cond == "popularity") this.sortByPopularityImp()
		else this.sortByMostRecentImp() 
	  }
	
	  timeDifference(now, date2) {
		var days = Math.round(Math.abs(now - date2) / (24*60*60*1000));
		var hours = Math.round(Math.abs(now - date2) / (60*60*1000));
		var mins = Math.round(Math.abs(now - date2) / (60*1000));
		if (hours > 23) {
		  if (days == 1) return (days+" day ago")
		  return (days+" days ago")
		}
		if (mins > 59) {
		  if (hours == 1) return (hours+" day ago")
		  return (hours+" hours ago")
		}
		if (mins == 1) return (mins+" min ago")
		return (mins+" mins ago")
	  }
		num=0;
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
		this.userService.getUserByUsername(this.user).subscribe(
		  res => {
			if (res.body[0].profile.pending_friends.includes(username)){
			  this.router.navigate(['/profile'], {queryParams: {user: username, req: true}})
			}
			else this.router.navigate(['/profile'], {queryParams: {user: username}})
		  },
		  err => {
			console.log(err)
		  }
		)
	  }
	subscribe(fandom){	
		this.userService.subscribe(this.user, fandom).subscribe(
			res => {
				console.log(res.body)
				this.followB = "unfollow";
				this.showFollowB = !this.showFollowB;
				this.showUnfollowB = !this.showUnfollowB;
				this.fandomService.setSubCount(this.name, this.subcount+1).subscribe(
					res => {
						console.log(res.body)
					},
					err => {console.log(err)}
				)
			},
			err => {
				console.log(err)
			}
		)
	}

	unsubscribe(fandom){
		this.userService.unsubscribe(this.user, fandom).subscribe(
			res => {
				console.log(res.body)
				this.followB = "follow";
				this.showFollowB = !this.showFollowB;
				this.showUnfollowB = !this.showUnfollowB;
				this.fandomService.setSubCount(this.name, this.subcount-1).subscribe(
					res => {
						console.log(res.body)
					},
					err => {console.log(err)}
				)
			},
			err => {
				console.log(err)
			}
		)
	}

	toEditFandom(){
		if (this.admin == this.user){
			var username = prompt("Confirm username");
			var password = prompt("Confirm password");
			if (username!=null && password!=null){
				this.router.navigate(['/editfandom'], {queryParams: {id: this.id}})
			}
		}
		else {
			alert("You are not the admin of this fandom!!")
		}
	}

	deleteFandom(){
		if (this.admin == this.user){
		  var username = prompt("Confirm username");
		  var password = prompt("Confirm password");
		  if (username!=null && password!=null){
			this.fandomService.deleteFandom(this.id).subscribe(
			  res => {
				console.log(res.body)
				this.router.navigate(['/posts'])
			  },
			  err => {
				console.log(err)
			  }
			)
		  }
		}
		else{
		  alert("You are not the admin of this fandom!!")
		}
	}
}
