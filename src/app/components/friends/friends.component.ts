import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendService } from 'src/app/services/friend.service';
import { Friend } from '../../shared/model'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  users$:Observable<Friend[]> = new Observable();
  friends$:Observable<Friend[]> = new Observable();
  requests$:Observable<Friend[]> = new Observable();
  searched$:any
  searchIsEmpty:boolean=true;

  constructor(public friendService:FriendService) { }

  ngOnInit(): void {
    this.users$ = this.friendService.getAllUsers$();
    this.friends$ = this.friendService.getFriends$();
    this.requests$ = this.friendService.getRequests$();
  }

  search(name:string){
    if(name){
      this.users$.forEach(users=>{
        this.searched$ = users.filter(user=>user.name.includes(name))
      })
      this.searchIsEmpty=false;
    }
    else this.searchIsEmpty=true;

  }
}
