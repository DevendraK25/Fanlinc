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

	password=""
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
	imageW = 0
	imageH = 0
	width = 0
	width1 = 0
	width2 = 0
	constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private fandomService: FandomService, private session: LocalStorageService,
		private postService: PostService) { }

	ngOnInit() {
		this.user = this.session.retrieve('logged-in');
		this.userService.getUserByUsername(this.user).subscribe(
			res => {
				this.password = res.body[0].password
			}
		)
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
					var img = new Image();
					img.onload = () => {
						this.imageW = img.width;
						this.imageH = img.height;
					}
					img.src = res.body[0].image;
					if ((this.imageH/this.imageW) > 1.3) {this.width = 30; this.width1=70}
					else {this.width = 45; this.width1=55}
					this.id = res.body[0]._id;
					this.userService.getUserByUsername(this.user).subscribe(
						res => {
							console.log(res.body)
							if ((res.body[0].profile.subscribed).includes(this.name) && this.user!="" && this.user!=null) {
								this.followB = "unfollow"
								this.showFollowB = !this.showFollowB;
								this.showUnfollowB = !this.showUnfollowB;
								this.width2 = 80
							}
							else if (this.admin == this.user) {
								this.showFollowB = !this.showFollowB
								this.showB = !this.showB
								this.showAdminB = !this.showAdminB
								this.width2 = 68
							} 
							else if ((!(res.body[0].profile.subscribed).includes(this.name) && this.user!="" && this.user!=null)||this.user==""){
								this.width2 = 85
							}
						},
						err => {
							console.log(err)
						}
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
					if (this.route.snapshot.queryParamMap.get("sort") == "popularity"){
						this.postHeader = "Most Popular posts"
						this.sortByPopularityImp();
					}
					else if (this.route.snapshot.queryParamMap.get("sort") == "most-recent"){
						this.postHeader = "Most Recent posts"
						this.sortByMostRecentImp();
					}
				}
			},
			err => {
				this.postHeader = "No posts yet"
			}
		)

		$("#recent-filter").on("click", () => {
			if ($("#pop-filter").is(":checked")) $("#pop-filter").prop("checked", false)
			this.checkMostRecent = !this.checkMostRecent
		})
	  
		$("#pop-filter").on("click", () => {
			if ($("#recent-filter").is(":checked")) $("#recent-filter").prop("checked", false)
			this.checkPopularity = !this.checkPopularity
		})	
	}

	toSortedPostPg(){
		if (this.checkMostRecent){
			this.router.navigate(['/fandom-page'], {queryParams: {sort: "most-recent", fandom: this.name}}).then(()=>{window.location.reload()})
		}
		else if (this.checkPopularity){
			this.router.navigate(['/fandom-page'], {queryParams: {sort: "popularity", fandom: this.name}}).then(()=>{window.location.reload()})
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
		if (this.user != "" && this.user != null) {
			this.userService.subscribe(this.user, fandom).subscribe(
				res => {
					console.log(res.body)
					this.followB = "unfollow";
					this.showFollowB = !this.showFollowB;
					this.showUnfollowB = !this.showUnfollowB;
					this.width2 = 80
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
		else {
			if (confirm("Sign in first!!"))
				this.router.navigate(['/login'])
		}
    }

	unsubscribe(fandom){
		this.userService.unsubscribe(this.user, fandom).subscribe(
			res => {
				console.log(res.body)
				this.followB = "follow";
				this.showFollowB = !this.showFollowB;
				this.showUnfollowB = !this.showUnfollowB;
				this.width2 = 85
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

	toNewPost(){
		if (this.user != null && this.user != "")
		  	this.router.navigate(['/create-new-post'], {queryParams: {fandom: this.name}});
		else {
		  	if (confirm('Sign in first!'))
				this.router.navigate(['/login'])
		}
	}

	toEditFandom(){
		if (this.admin == this.user){
			var username = prompt("Confirm username");
			var password = prompt("Confirm password");
			if (username==this.user && password==this.password){
				this.router.navigate(['/editfandom'], {queryParams: {fandom: this.name}})
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

	deletePost(id, author){
		if (author == this.user){
		  var username = prompt("Confirm username");
		  var password = prompt("Confirm password");
		  if (username==this.user && password==this.password){
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
