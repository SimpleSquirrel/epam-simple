import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friends:any[]=[];
  requests:any[]=[];
  users:any[]=[];

  constructor(public firebaseService : FirebaseService, public afs:AngularFirestore) { }

  ngOnInit(): void {
    this.afs.firestore.collection('users')
    .doc(this.firebaseService.getCurrentUserId())
    .collection('friends').get().then((q)=>
    {
      q.docs.map((doc)=>{
        this.friends.push({name:doc.data().name, id:doc.id})
      })
    })

    this.afs.firestore.collection('users').doc(this.firebaseService.getCurrentUserId()).collection('requests').get().then((q)=>
    {
      q.docs.map((doc)=>{
        this.requests.push({name:doc.data().name, id:doc.id})
      })
    })

    this.afs.firestore.collection('users')
    .get().then((q)=>
    {
      q.docs.map((doc)=>{
        this.users.push({name:doc.data().name, id:doc.id})
      })
    })
  }
}
