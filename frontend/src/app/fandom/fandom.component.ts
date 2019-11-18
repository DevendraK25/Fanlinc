import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-fandom',
  templateUrl: './fandom.component.html',
  styleUrls: ['./fandom.component.css']
})
export class FandomComponent implements OnInit {
  
  // posts = [
  //   {
  //     tags:['fandom1','fandom2'],
  //     title:'title1',
  //     fandom:'Avengers1',
  //     image:'https://via.placeholder.com/100.jpg',
  //     author:'user1',
  //     timestamp:'01/02/2019',
  //     comments:['11','12','13'],
  //     numVotes:10
  //   },
  //   {
  //     tags:['fandom3','fandom4'],
  //     title:'title2',
  //     fandom:'Avengers2',
  //     content:"content2",
  //     image:'https://via.placeholder.com/100.jpg',
  //     author:'user2',
  //     timestamp:'03/04/2019',
  //     comments:['14','15','16', '17'],
  //     numVotes:14
  //   },
  // ]
  posts:any;

  categories = ['movies', 'anime', 'tv shows', 'sports']
  constructor(private router: Router, private postService:PostService, private session: SessionStorageService) {
  }

  ngOnInit() {
    var user = this.session.retrieve("logged-in");
    console.log(user)
    if (user != null){
      this.postService.getAllPosts().subscribe(
        res => {
          if (res.status == 200) 
            this.posts = res.body;
            console.log(this.posts);

            for (var i=0; i<this.posts.length; i++){
              var commentDiv = "";
              var tagsDiv = "";
              for (var j=0; j<this.posts[i].comments.length; j++){
                commentDiv+=`<div class='dropdown-item' style='font-size:14px;padding-left:5px;display:block'><div>`+this.posts[i].comments[j]+`</div></div>`;
              }
              for (var j=0; j<this.posts[i].tags.length; j++){
                tagsDiv+="#"+this.posts[i].tags[j]+" ";
              }
              $("#post").append(
                `
                <div id='post-box' class='row'>
                    <div class='column' style='width:10%;text-align: center;'>
                    
                        <img src=`+this.posts[i].image+` alt="user" style="width:60px;border-radius: 50%;">
                        <hr style='width:50px;margin:10px auto 5px auto;'>
                        <div style='font-size:13px;'>`+this.posts[i].author+`</div>
                    </div>
                    <div class='column' style='width:80%; margin-left:20px;padding:0 10px 0 10px'>
                        <div style='font-size:13px;margin-top:-10px;color:#A6ACAF;text-align: left;'>
                            `+tagsDiv+`
                            <div style='float:right'>posted on: `+this.posts[i].timestamp+`</div>
                        </div>
                        <h4><b>`+this.posts[i].title+`</b></h4>
                        <div style='margin-bottom: 10px;'>`+this.posts[i].content+`</div>
                        <div class="dropdown">
                            <button class="btn-outline dropdown-toggle" data-toggle='dropdown' id='comments'>`+this.posts[i].comments.length+` comments</button>
                            <div style='width:500px' class='dropdown-menu'>
                                <!--<div class='dropdown-item' style='font-size:14px;padding-left:5px;display:block'>
                                    <div>comment1</div>
                                    <div style='text-align: right;'>posted on:</div>
                                </div>-->
                                `+commentDiv+`
                            </div>
                         <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fandom: </b>   
                        `+this.posts[i].fandom+`
                        </div>
                    </div>
                    <div class='column' style='margin:-5px 0 -5px 0;width:1px;background: #E5E7E9;'></div>
                    <div class='column' style='margin:auto auto auto auto'>
                        <div class='arrow-up'></div>
                        <p style='text-align: center;'>`+this.posts[i].numVotes+`</p>
                        <div class="arrow-down"></div>
                        
                    </div>
                </div>
                <p></p>
        
                <style>
                    #post-box{
                        width:95%;
                        background:white;
                        padding:15px 0px 15px 15px;
                    }
        
                    #comments{
                        margin-top:5px;
                        font-size:14px;
                        border:none;
                        background: #EAEDED;
                    }
        
                    .arrow-up {
                        width: 0; 
                        height: 0; 
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-bottom: 10px solid #D7DBDD;
                    }
        
                    .arrow-down {
                        width: 0; 
                        height: 0; 
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-top: 10px solid #D7DBDD;
                        margin-top:-65%;
                    }
        
                    .arrow-up:hover {
                        width: 0; 
                        height: 0; 
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-bottom: 10px solid #909497;
                    }
        
                    .arrow-down:hover {
                        width: 0; 
                        height: 0; 
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-top: 10px solid #909497;
                        margin-top:-65%;
                    }
                </style>
                `
              );
            }
        
            for (var i=0; i<this.categories.length; i++){
                $("#categories").append(
                  `
                  <a (click)='sort()' style='font-size:14px' class='dropdown-item'>`+this.categories[i]+`</a>
                  `
                )
            }

        },
        err => {
          this.router.navigate(['/page-not-found']);
        }
      );
    }
    else {
      alert('sign in first!');
      this.router.navigate(['/login']);
    }
  }

  getList() {
    this.router.navigate(['/fandom-list']);
  }

}
