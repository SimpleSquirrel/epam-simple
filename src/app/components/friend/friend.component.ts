import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  @Input() friend:any;
  @Input() yourFriends:boolean = true;
  @Input() requests:boolean = false;

  constructor(public firebaseService : FirebaseService, public afs:AngularFirestore) { }

  ngOnInit(): void {
    
  }

  removeFriend(){
    this.firebaseService.removeFriend(this.friend.id)
  }

  acceptRequest(){
    this.firebaseService.acceptRequest(this.friend.id)
  }

  declineRequest(){
    this.firebaseService.declineRequest(this.friend.id)
  }
  sendRequest(){
    this.firebaseService.sendRequest(this.friend.id)
  }
}
