import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData$:any;

  @Output() isLogout = new EventEmitter<void>();
  constructor(
    public fs:FirebaseService, 
    public userService:UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserInfo$().then(data=>{this.userData$ = data})
  }

  logout(){
    this.fs.logout();
    this.isLogout.emit();
  }

  updateProfile(name:string, age:number){
    this.userData$ = this.userService.updateProfile$({name:name,age:age})
  }
}
