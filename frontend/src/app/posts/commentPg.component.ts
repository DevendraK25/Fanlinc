import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, QueryList, ViewChildren, Inject } from '@angular/core';
import * as $ from 'jquery';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-fandom',
  templateUrl: './commentPg.component.html',
  styleUrls: ['./commentPg.component.css']
})
export class CommentPgComponent implements OnInit, AfterViewInit{

    @ViewChild('replyBox', {static:false}) replyBox:ElementRef

    isShow = false;

    post: any;
    postImage:string
    postTag:string
    postId:string
    postTitle:string
    postAuthor:string
    postContent:string
    postTimestamp :string
    postNumVote:number
    postFandom:string
    postNumComment:number
    postComments=[]
    constructor(private userService: UserService, private el: ElementRef, private router: Router, private route: ActivatedRoute, private postService:PostService, private session: SessionStorageService, private renderer: Renderer2){}

    ngAfterViewInit(): void {
        (document.querySelector(".replyBox") as HTMLElement).style.display = "auto"
    }

    ngOnInit(): void {
        console.log()
        this.postService.getPost(this.route.snapshot.queryParamMap.get('postId')).subscribe(
            res => {
                if (res.status == 200){
                    console.log(res.body)
                    this.post = res.body;
                    this.postTitle = this.post[0].title
                    this.postContent = this.post[0].content
                    this.userService.getUserByUsername(this.post[0].author).subscribe(
                        res => {
                            console.log(res.body)
                            this.postImage = res.body[0].image
                        },
                        err => {
                            console.log(err)
                        }
                    )
                    this.postAuthor = this.post[0].author
                    this.postTag = this.post[0].tags
                    this.postNumComment = this.post[0].comments.length
                    this.postTimestamp = this.post[0].timestamp
                    this.postNumVote = this.post[0].numVotes
                    this.postId = this.post[0]._id
                    this.postFandom = this.post[0].fandom
                    this.postComments = this.post[0].comments
                }
            },
            err => {
                console.log(err)
                this.router.navigate(['/page-not-found']);
            }
        )
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
    
}