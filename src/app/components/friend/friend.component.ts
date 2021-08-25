import { Component, Input, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';
import { Friend } from 'src/app/shared/model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  @Input() friend:Friend = {name:'',id:''};
  @Input() yourFriends:boolean = true;
  @Input() requests:boolean = false;

  constructor(public friendService:FriendService) { }

  ngOnInit(): void {
    
  }

   removeFriend(){
     this.friendService.removeFriend(this.friend)
  }

   acceptRequest(){
     this.friendService.acceptRequest(this.friend)
  }

   declineRequest(){
     this.friendService.declineRequest(this.friend)
  }
   sendRequest(){
     this.friendService.sendRequest(this.friend)
  }
}
