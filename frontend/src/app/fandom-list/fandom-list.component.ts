import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FandomService } from '../fandom.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { LoginComponent } from '../login/login.component';

@Component({
	selector: 'app-fandom-list',
	templateUrl: './fandom-list.component.html',
	styleUrls: ['./fandom-list.component.css']
})
export class FandomListComponent implements OnInit {
    fandoms:any;
    constructor(private router: Router, private fandomService:FandomService, private session: SessionStorageService) {
    }
  
    ngOnInit() {
        var user = this.session.retrieve("logged-in");
        console.log(user)
        if (user != null){
          this.fandomService.getAllFandoms().subscribe(
            res => {
              if (res.status == 200) 
                this.fandoms = res.body;
                console.log(this.fandoms);
    
                for (var i=0; i<this.fandoms.length; i++){
                  $("#fandom").append(
                    `
                    <div id='post-box' class='row'>
                        <button class='column' style='width:20%; text-align: center; margin-left: 40px; background-color:orange;
                        border-radius: 12px'>
                        <h4><b>`+this.fandoms[i].name+`</b></h4>   
                        </button>
                    </div>
                    <p></p>
                    
                    <style>
                        #post-box{
                            width:95%;
                            background:lightgray;
                            padding:15px 0px 15px 15px;
                        }

                        #comments{
                            margin-top:5px;
                            font-size:14px;
                            border:none;
                            background: #EAEDED;
                        }
                    </style>
                    `
                  );
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

      createFandom(name) {
        var user = this.session.retrieve("logged-in");
        console.log(user)
        if (user != null) {
            this.fandomService.createFandom(name, null, 0, null, null, null); {

           }
        }
      }

      getFandom() {
          
      }
    
}
