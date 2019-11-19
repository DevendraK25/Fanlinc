import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, QueryList, ViewChildren, Inject } from '@angular/core';
import * as $ from 'jquery';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { LoginComponent } from '../login/login.component';
import { FandomService } from '../fandom.service';

@Component({
	selector: 'app-fandom',
	templateUrl: './fandom.component.html',
	styleUrls: ['./fandom.component.css']
})
export class FandomComponent implements OnInit, AfterViewInit{
  
  // @ViewChild('postDiv', {static: false}) postDiv: ElementRef;
  @ViewChildren('postDiv') postDivList: QueryList<ElementRef<HTMLUListElement>>;
  @ViewChild('postDiv', {static: false}) postDiv: ElementRef<HTMLElement>;
  
  posts:any;
  fandoms: any;
	fandomNames = [];
	fandomImages = [];
  categories = ['movies', 'anime', 'tv shows', 'sports']
  constructor(private fandomService: FandomService, private el: ElementRef, private router: Router, private postService:PostService, private session: SessionStorageService, private renderer: Renderer2) {}

  postIds = {}
  postNumV = {}

  ngAfterViewInit() {
    // var user = this.session.retrieve("logged-in");
    // console.log(user)
    // if (user != null){
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
        
        }
      );

	 console.log(this.fandomImages);
	 console.log(this.fandomNames);
    // var user = this.session.retrieve("logged-in");
    // if (user != null){
      this.postService.getAllPosts().subscribe(
        res => {
          if (res.status == 200) 
            this.posts = res.body;

            for (var i=0; i<this.posts.length; i++){
              this.postIds[i] = this.posts[i]._id;
              this.postNumV[i] = this.posts[i].numVotes;
            }

            for (var i=0; i<this.posts.length; i++){
              var commentDiv = "";
              var tagsDiv = "";
              for (var j=0; j<this.posts[i].comments.length; j++){
                commentDiv+=`<div class='dropdown-item' style='font-size:14px;padding-left:5px;display:block'><div>`+this.posts[i].comments[j]+`</div></div>`;
              }
              for (var j=0; j<this.posts[i].tags.length; j++){
                tagsDiv+="#"+this.posts[i].tags[j]+" ";
              }
              var r = this.renderer
              var div1 = r.createElement('div');
              r.setProperty(div1, "id", this.posts[i]._id); r.addClass(div1, "row"); r.addClass(div1, "div1");
              var div2 = r.createElement('div')
              r.setProperty(div2, "id", "div2"); r.addClass(div2, "column");
              var imgCont = r.createElement("img"); r.setProperty(imgCont, "id", "imgCont")
              var img = r.createElement("a")
              r.setProperty(imgCont, "src", this.posts[i].image)
              r.setProperty(img, "id","img")
              r.appendChild(img, imgCont)
              var hr = r.createElement("hr")
              r.setProperty(hr, "id", "hr")
              var div3 = r.createElement("div")
              r.setProperty(div3, "id", "div3"); r.addClass(div3, this.posts[i].author)
              var div4 = r.createElement("div")
              r.setProperty(div4, "id", "div4"); r.addClass(div4, "column")
              var div5 = r.createElement("div")
              r.setProperty(div5, "id", "div5")
              var div6Before = r.createElement("div"); r.setProperty(div6Before, "id", "div6Before");
              var div6 = r.createElement("div")
              r.setProperty(div6, "id", "div6")
              r.appendChild(div6Before, div6)
              var optB = r.createElement("div"); r.setProperty(optB, "id", "optB");//r.setProperty(optB, "class", "dropdown-toggle"); r.setProperty(optB, "data-toggle", "dropdown")
              var optBCont = r.createElement("a"); r.setProperty(optBCont, "id", "optBCont"); 
              // var dDown = r.createElement("div"); r.setProperty(dDown, "class", "dropdown-menu")
              // var edit = r.createElement("div"); r.setProperty(edit, "class", "dropdown-item")
              // r.appendChild(edit, r.createText("edit"))
              // var del = r.createElement("div"); r.setProperty(del, "class", "dropdown-item")
              // r.appendChild(del, r.createText("delete"))
              // r.appendChild(dDown, edit); r.appendChild(dDown, del)
              r.appendChild(optB, optBCont)
              // r.appendChild(optBCont, dDown)
              var h4 = r.createElement("h4")
              r.setProperty(h4, "id", "h4")
              var b = r.createElement("b")
              r.setProperty(h4, "id", "b")
              var div7 = r.createElement("div")
              r.setProperty(div7, "id", "div7")
              var div8 = r.createElement("div")
              r.setProperty(div8, "id", "div8"); r.addClass(div8, "dropdown")
              var button = r.createElement("button")
              r.setProperty(button, "id", "button"); r.addClass(button, "btn-outline"); //r.addClass(button, "dropdown-toggle"); r.setProperty(button, "data-toggle", "dropdown"); 
              r.addClass(button, this.posts[i]._id)
              var div9 = r.createElement("div")
              r.setProperty(div9, "id", "div9"); r.addClass(div9, "dropdown-menu");
              var div10 = r.createElement("div")
              r.setProperty(div10, "id", "div10"); r.addClass(div10, "column");
              var div11 = r.createElement("div")
              r.setProperty(div11, "id", "div11"); r.addClass(div11, "column");
              var div12 = r.createElement("div")
              r.setProperty(div12, "id", "div12");
              var p = r.createElement("p")
              r.addClass(p, "p");
              r.addClass(p, this.posts[i].numVotes); r.setProperty(p, "id", this.posts[i]._id+this.posts[i].numVotes)
              var div13 = r.createElement("div")
              r.setProperty(div13, "id", "div13")
              var p1 = r.createElement("p")
              r.setProperty(p1, "id", "p1")              

              r.appendChild(this.postDiv.nativeElement, div1)
                r.appendChild(div1, div2)
                  r.appendChild(div2, img)
                  r.appendChild(div2, hr)
                  r.appendChild(div2, div3)
                    r.appendChild(div3, r.createText(this.posts[i].author))
                r.appendChild(div1, div4)
                  r.appendChild(div4, div5)
                    r.appendChild(div5, r.createText(tagsDiv))
                    r.appendChild(div5, div6)
                      r.appendChild(div6, r.createText(this.posts[i].timestamp))
                    r.appendChild(div5, optB)
                    r.appendChild(div4, h4)
                      r.appendChild(h4, b)
                        r.appendChild(b, r.createText(this.posts[i].title))
                    r.appendChild(div4, div7)
                      r.appendChild(div7, r.createText(this.posts[i].content))
                    r.appendChild(div4, div8)
                      r.appendChild(div8, button)
                        r.appendChild(button, r.createText(this.posts[i].comments.length+' comments'))
                      r.appendChild(div8, div9)
                      r.appendChild(div9, r.createText(commentDiv))
                r.appendChild(div1, div10)
                r.appendChild(div1, div11)
                  r.appendChild(div11, div12)
                  r.appendChild(div11, p)
                    r.appendChild(p, r.createText(this.posts[i].numVotes))
                  r.appendChild(div11, div13)
              r.appendChild(this.postDiv.nativeElement, p1)
              div12.addEventListener("click", ()=>this.upvote(div1.id, parseInt(p.classList[1]))) //1:numVotes
              div13.addEventListener("click", ()=>this.downvote(div1.id, parseInt(p.classList[1])))
              button.addEventListener("click", ()=>this.toCommentPage(div1.id))
              img.addEventListener("click", ()=>this.toUserProfile(div3.classList[0]))

    // this.x+=`<div class='post-box row'><div id='postId' style='display:none'>`+this.posts[i]._id+`</div> //div1
    //                 <div class='column' style='width:10%;text-align: center;'> //div2
    //                     <img src=`+this.posts[i].image+` alt="user" style="width:60px;border-radius: 50%;"> //img
    //                     <hr style='width:50px;margin:10px auto 5px auto;'> //hr
    //                     <div style='font-size:13px;'>`+this.posts[i].author+`</div> //div3
    //                 </div>
    //                 <div class='column' style='width:80%; margin-left:20px;padding:0 10px 0 10px'> //div4
    //                     <div style='font-size:13px;margin-top:-10px;color:#A6ACAF;text-align: left;'> //div5
    //                         `+tagsDiv+`
    //                         <div style='float:right'>posted on: `+this.posts[i].timestamp+`</div> //div6
    //                     </div>
    //                     <h4><b>`+this.posts[i].title+`</b></h4> //h4
    //                     <div style='margin-bottom: 10px;'>`+this.posts[i].content+`</div> //div7
    //                     <div class="dropdown"> //div8
    //                         <button class="btn-outline dropdown-toggle" data-toggle='dropdown' id='comments'>`+this.posts[i].comments.length+` comments</button> //button
    //                         <div style='width:500px' class='dropdown-menu'> //div9
    //                             <!--<div class='dropdown-item' style='font-size:14px;padding-left:5px;display:block'>
    //                                 <div>comment1</div>
    //                                 <div style='text-align: right;'>posted on:</div>
    //                             </div>-->
    //                             `+commentDiv+`
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class='column' style='margin:-5px 0 -5px 0;width:1px;background: #E5E7E9;'></div> //div10
    //                 <div class='column' style='margin:auto auto auto auto'> //div11
    //                     <div onclick='upvote(postId.value, numVotes.value)' class='arrow-up'></div> //div12
    //                     <p id='numVotes' style='text-align: center;'>`+this.posts[i].numVotes+`</p> //p
    //                     <div onclick='downvote(postId.value, numVotes.value)' class="arrow-down"></div> //div13
    //                 </div>
    //             </div>
    //             <p></p>
        
    //             <style>
    //                 .post-box{
    //                     width:95%;
    //                     background:white;
    //                     padding:15px 0px 15px 15px;
    //                 }
        
    //                 #comments{
    //                     margin-top:5px;
    //                     font-size:14px;
    //                     border:none;
    //                     background: #EAEDED;
    //                 }
        
    //                 .arrow-up {
    //                     width: 0; 
    //                     height: 0; 
    //                     border-left: 10px solid transparent;
    //                     border-right: 10px solid transparent;
    //                     border-bottom: 10px solid #D7DBDD;
    //                 }
        
    //                 .arrow-down {
    //                     width: 0; 
    //                     height: 0; 
    //                     border-left: 10px solid transparent;
    //                     border-right: 10px solid transparent;
    //                     border-top: 10px solid #D7DBDD;
    //                     margin-top:-65%;
    //                 }
        
    //                 .arrow-up:hover {
    //                     width: 0; 
    //                     height: 0; 
    //                     border-left: 10px solid transparent;
    //                     border-right: 10px solid transparent;
    //                     border-bottom: 10px solid #909497;
    //                 }
        
    //                 .arrow-down:hover {
    //                     width: 0; 
    //                     height: 0; 
    //                     border-left: 10px solid transparent;
    //                     border-right: 10px solid transparent;
    //                     border-top: 10px solid #909497;
    //                     margin-top:-65%;
    //                 }
    //             </style>
    //             `
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
    // }
    // else {
    //   alert('sign in first!');
    //   this.router.navigate(['/login']);
    // }

    this.postDivList.toArray().forEach((item, index) => {
      // item.nativeElement.addEventListener('click', () => {
      //   var arr = Array.from(item.nativeElement.querySelectorAll(".div1"));
      //   for (var i=0; i<arr.length; i++){
      //     // this.upvote(arr[i].querySelector(".p").id, arr[i].querySelector(".p").classList[1])
      //     this.toCommentPage(arr[i].querySelector("#button").classList[1])
      //   }
      // })
      // item.nativeElement.addEventListener('click', () => {
        // var arr = Array.from(item.nativeElement.querySelectorAll(".div1"));
        // for (var i=0; i<arr.length; i++){
          // this.upvote(arr[i].querySelector(".p").id, arr[i].querySelector(".p").classList[1])
          // console.log(this.postIds[19])
        // }
      // })
    });
    
  }

  ngOnInit() { }

  id="";num=0;
  upvote(postId, numVotes){ //first post clicked
    if (this.id == ""){
      this.id = postId
      this.num = numVotes+1;
      $("#"+postId+numVotes).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
    else if (this.id == postId){//same post clicked
      this.num += 1;
      $("#"+postId+numVotes).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
    else { //different post
      this.id = postId
      this.num = numVotes+1
      $("#"+postId+numVotes).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
  }

  downvote(postId, numVotes){
    if (this.id == ""){ //first post clicked
      this.id = postId
      this.num = numVotes-1;
      $("#"+postId+numVotes).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
    else if (this.id == postId){ //same post clicked
      this.num -= 1;
      $("#"+postId+numVotes).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
    else { //different post
      this.id = postId
      this.num = numVotes-1
      $("#"+postId+numVotes).html(this.num)
      this.postService.setNumVotes(postId, this.num).subscribe(
        res=>{
          console.log(res.body)
        }
      )
    }
  }
	redirectToFandom(nameIndex){
		this.router.navigate(['/fandoms/' + this.fandomNames[nameIndex]]);
	}

  toCommentPage(postId){
    this.router.navigate(['/post-comments'], {queryParams: {postId:postId}})
  }

  toUserProfile(username){
    console.log(username)
    this.router.navigate(['/profile'], {queryParams: {user: username}})
  }
}
