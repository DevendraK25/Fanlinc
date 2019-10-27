import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup;
  username = "";
  email = "";
  bio = "hello there, how's it going?";
  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userService.getUserByUsername(this.route.snapshot.queryParamMap.get('user')).subscribe(
      res => {
        if (res.status == 200) 
          this.username = res.body[0].username;
          this.email = res.body[0].email;
      },
      err => {
        this.router.navigate(['/page-not-found']);
      }
    );    
  }

  editBio(biotext, save){
    biotext.removeAttribute('readonly');
    biotext.style.outline = 'auto';
    biotext.style.resize = 'auto';
  }

}
