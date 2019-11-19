import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FandomService } from '../fandom.service';

@Component({
    selector: 'app-new-fandom',
    templateUrl: './new-fandom.component.html',
    styleUrls: ['./new-fandom.component.css']
  })
export class NewFandomComponent implements OnInit {

    constructor(private router: Router, private fandomService: FandomService) {

    }

    ngOnInit() {

    }

    createFandom(name, admin) {
        if (name != '' && admin != '') {
        this.fandomService.addFandom(name, admin).subscribe(
            res => {
                if (res.status == 200) {
                    console.log("Post succesfully created");
                    this.router.navigate(['/fandoms/'+name]);
                }
                },
                err => {
                    console.log("i got here");
                }
        );
            }
    }
}