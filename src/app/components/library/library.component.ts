import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/shared/model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  games$:Observable<Game[]> = new Observable();
  //games:any[] = [];

  constructor(//public firebaseService : FirebaseService,
     //public afs:AngularFirestore,
     public gameService:GameService) { 
    // this.afs.firestore.collection('users')
    // .doc(this.firebaseService.getCurrentUserId())
    // .collection('games').get().then((q)=>
    // {
    //   q.docs.map((doc)=>{
    //     this.games.push({name:doc.data().name, id:doc.id,price:doc.data().price,description:doc.data().description})
    //   })
    // })
  }

  ngOnInit(): void {
    this.games$ = this.gameService.getUserGames$();
  }
}
