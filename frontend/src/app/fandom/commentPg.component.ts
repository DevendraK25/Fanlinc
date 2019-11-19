import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, QueryList, ViewChildren, Inject } from '@angular/core';
import * as $ from 'jquery';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-fandom',
  templateUrl: './commentPg.component.html',
  styleUrls: ['./commentPg.component.css']
})
export class CommentPgComponent implements OnInit, AfterViewInit{

    @ViewChild("show", {static:false}) ref:ElementRef
    constructor(private el: ElementRef, private router: Router, private route: ActivatedRoute, private postService:PostService, private session: SessionStorageService, private renderer: Renderer2){}

    ngAfterViewInit(): void {
        var postId = this.route.snapshot.queryParamMap.get('postId')
        this.postService.getPost(postId).subscribe(
            res => {
                var obj = res.body[0];
                // console.log(obj._id)
                var tagsDiv=""
                for (var j=0; j<obj.tags.length; j++){
                    tagsDiv+="#"+obj.tags[j]+" ";
                }

                var r = this.renderer
                var div1 = r.createElement('div');
                r.setProperty(div1, "id", obj.p); r.addClass(div1, "row"); r.addClass(div1, "div1");
                var div2 = r.createElement('div')
                r.setProperty(div2, "id", "div2"); r.addClass(div2, "column");
                var imgCont = r.createElement("img"); r.setProperty(imgCont, "id", "imgCont")
                var img = r.createElement("a")
                r.setProperty(imgCont, "src", obj.image)
                r.setProperty(img, "id","img")
                r.appendChild(img, imgCont)
                var hr = r.createElement("hr")
                r.setProperty(hr, "id", "hr")
                var div3 = r.createElement("div")
                r.setProperty(div3, "id", "div3")
                var div4 = r.createElement("div")
                r.setProperty(div4, "id", "div4"); r.addClass(div4, "column")
                var div5 = r.createElement("div")
                r.setProperty(div5, "id", "div5")
                var div6 = r.createElement("div")
                r.setProperty(div6, "id", "div6")
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
                r.addClass(button, obj._id)
                var reply = r.createElement("button"); r.setProperty(reply, "id", "button1");
                // var div9 = r.createElement("div")
                // r.setProperty(div9, "id", "div9"); r.addClass(div9, "dropdown-menu");
                var div10 = r.createElement("div")
                r.setProperty(div10, "id", "div10"); r.addClass(div10, "column");
                var div11 = r.createElement("div")
                r.setProperty(div11, "id", "div11"); r.addClass(div11, "column");
                var div12 = r.createElement("div")
                r.setProperty(div12, "id", "div12");
                var p = r.createElement("p")
                r.addClass(p, "p");
                //   r.addClass(p, this.posts[i]._id); r.addClass(p, this.posts[i].numVotes); 
                var div13 = r.createElement("div")
                r.setProperty(div13, "id", "div13")
                var p1 = r.createElement("p")
                r.setProperty(p1, "id", "p1") 
                var cdiv = r.createElement("div"); r.setProperty(cdiv, "id", "cdiv")
                for (var j=0; j<obj.comments.length; j++){
                    var cdiv1 = r.createElement("div"); r.setProperty(cdiv1, "id", "cdiv1")
                    r.appendChild(cdiv1, r.createText(obj.comments[j]))
                    if (j<obj.comments.length-1) r.appendChild(cdiv1, r.createElement("hr"))
                    r.appendChild(cdiv, cdiv1)
                }
                if (obj.comments.length==0){
                    r.appendChild(cdiv, r.createText("no comments"))
                }
                var div0 = r.createElement("div")
                div0.appendChild(div1)
                r.appendChild(this.ref.nativeElement, div0)
                    r.appendChild(div1, div2)
                    r.appendChild(div2, img)
                    r.appendChild(div2, hr)
                    r.appendChild(div2, div3)
                        r.appendChild(div3, r.createText(obj.author))
                    r.appendChild(div1, div4)
                    r.appendChild(div4, div5)
                        r.appendChild(div5, r.createText(tagsDiv))
                        r.appendChild(div5, div6)
                        r.appendChild(div6, r.createText(obj.timestamp))
                        r.appendChild(div4, h4)
                        r.appendChild(h4, b)
                            r.appendChild(b, r.createText(obj.title))
                        r.appendChild(div4, div7)
                        r.appendChild(div7, r.createText(obj.content))
                        r.appendChild(div4, div8)
                        r.appendChild(div8, button)
                            r.appendChild(button, r.createText(obj.comments.length+' comments'))
                        r.appendChild(div8, reply)
                            r.appendChild(reply, r.createText('reply'))
                        // r.appendChild(div8, div9)
                        // r.appendChild(div9, r.createText(commentDiv))
                    r.appendChild(div1, div10)
                    r.appendChild(div1, div11)
                    r.appendChild(div11, div12)
                    r.appendChild(div11, p)
                        r.appendChild(p, r.createText(obj.numVotes))
                    r.appendChild(div11, div13)
                r.appendChild(this.ref.nativeElement, p1)
                r.appendChild(this.ref.nativeElement, cdiv)

                this.renderer.listen(reply, "click", ()=>{
                    var newC = r.createElement("div"); r.setProperty(newC, "id", "newC")
                    var tArea = r.createElement("textarea"); r.setProperty(tArea, "placeholder", "Reply..."); r.setStyle(tArea, "width", "80%"); r.setProperty(tArea, "id", "tArea")
                    var cBox = r.createElement("div")
                    cBox.appendChild(tArea); 
                    r.setProperty(cBox, "id", "cBox")
                    var sendC = r.createElement("button"); r.setProperty(sendC, "id", "sendC"); sendC.appendChild(r.createText('Send'))
                    cBox.appendChild(sendC)
                    newC.appendChild(cBox)
                    div0.appendChild(newC)
                    this.renderer.listen(sendC, "click", ()=>{
                        console.log(this.ref.nativeElement.querySelector("#tArea").value,  postId)
                        this.postService.setComments(postId, this.ref.nativeElement.querySelector("#tArea").value).subscribe(
                            res => {
                                console.log(res.body)
                                window.location.reload()
                            }
                        )
                    })
                })
            },
            err => {
                this.router.navigate(['/page-not-found'])
            }
        )
    }
    ngOnInit(): void {}
    
}