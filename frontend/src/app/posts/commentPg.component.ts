import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, QueryList, ViewChildren, Inject } from '@angular/core';
import * as $ from 'jquery';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-fandom',
  templateUrl: './commentPg.component.html',
  styleUrls: ['./commentPg.component.css']
})
export class CommentPgComponent implements OnInit{

    @ViewChild('replyBox', {static:false}) replyBox:ElementRef

    isShow = false;

    user = ""
    post: any;
    postImage:string
    postTag:string
    postId:string
    postTitle:string
    userImage=""
    postAuthor:string
    postContent:string
    postTimestamp :string
    postNumVote:number
    postFandom:string
    postNumComment:number
    postComments=[]
    comments = ""
    constructor(private userService: UserService, private el: ElementRef, private router: Router, private route: ActivatedRoute, private postService:PostService, private session: LocalStorageService){}

    ngOnInit(): void {
        this.user = this.session.retrieve("logged-in")
        this.postService.getPost(this.route.snapshot.queryParamMap.get('postId')).subscribe(
            res => {
                if (res.status == 200){
                    console.log(res.body)
                    this.post = res.body;
                    this.postTitle = this.post[0].title
                    this.postContent = this.post[0].content
                    if (this.post[0].image != null)
                        this.postImage = this.post[0].image
                    else {
                        this.postImage = ""
                    }
                    this.postAuthor = this.post[0].author
                    this.postTag = this.post[0].tags
                    this.postNumComment = this.post[0].comments.length
                    if (this.post[0].comments.length <= 1) this.comments = "comment"
                    else this.comments = "comments"
                    this.postTimestamp = this.timeDifference((new Date().getTime()), this.post[0].timestamp)
                    this.postNumVote = this.post[0].numVotes
                    this.postId = this.post[0]._id
                    this.postFandom = this.post[0].fandom
                    this.postComments = this.post[0].comments
                    this.userImage = this.post[0].userImage
                }
            },
            err => {
                console.log(err)
                this.router.navigate(['/page-not-found']);
            }
        )
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

    replyClick(){
        if (this.session.retrieve("logged-in") != null)
            this.isShow = !this.isShow
        else{
            alert("Sign in first!")
            this.router.navigate(['/login'])
        }            
    }

    id="";num=0;
    upvote(){ 
        var postId = this.postId; var numVotes = this.postNumVote
        console.log(postId, numVotes, "up")
        if (this.id == ""){ //first post clicked
            this.id = postId
            this.num = numVotes+1;
            $("#numVote").html(this.num)
            this.postService.setNumVotes(postId, this.num).subscribe(
                res=>{
                console.log(res.body)
                }
            )
        }
        else if (this.id == postId){//same post clicked
            this.num += 1;
            $("#numVote").html(this.num)
            this.postService.setNumVotes(postId, this.num).subscribe(
                res=>{
                console.log(res.body)
                }
            )
        }
        else { //different post
            this.id = postId
            this.num = numVotes+1
            $("#numVote").html(this.num)
            this.postService.setNumVotes(postId, this.num).subscribe(
                res=>{
                console.log(res.body)
                }
            )
        }
    }

    downvote(){
        var postId = this.postId; var numVotes = this.postNumVote
        console.log(postId, numVotes, "down")
        if (this.id == ""){ //first post clicked
            this.id = postId
            this.num = numVotes-1;
            $("#numVote").html(this.num)
            this.postService.setNumVotes(postId, this.num).subscribe(
                res=>{
                console.log(res.body)
                }
            )
        }
        else if (this.id == postId){ //same post clicked
            this.num -= 1;
            $("#numVote").html(this.num)
            this.postService.setNumVotes(postId, this.num).subscribe(
                res=>{
                console.log(res.body)
                }
            )
        }
        else { //different post
            this.id = postId
            this.num = numVotes-1
            $("#numVote").html(this.num)
            this.postService.setNumVotes(postId, this.num).subscribe(
                res=>{
                console.log(res.body)
                }
            )
        }
    }

    sendComment(comment){
        console.log(comment)
        this.postService.addComment(this.postId, comment, this.session.retrieve("logged-in")).subscribe(
            res => {
                console.log(res.body)
                window.location.reload()
            },
            err => {
                console.log(err)
            }
        )
    }

    redirectToFandom(fandom){
		this.router.navigate(['/fandom-page'], {queryParams: {"fandom": fandom}});
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
    
}