import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  games:any[] = [];

  constructor(public firebaseService : FirebaseService, public afs:AngularFirestore) { 
    this.afs.firestore.collection('users')
    .doc(this.firebaseService.getCurrentUserId())
    .collection('games').get().then((q)=>
    {
      q.docs.map((doc)=>{
        this.games.push({name:doc.data().name, id:doc.id})
      })
    })
  }

  ngOnInit(): void {
  }

}
