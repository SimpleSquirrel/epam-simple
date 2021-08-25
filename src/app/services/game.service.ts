import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Game } from '../shared/model'
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private afs:AngularFirestore, private fs:FirebaseService) { }

  getAllGames$(){
    return this.afs.collection('games').snapshotChanges().pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Game>{
          id:snap.payload.doc.id,
          ...new Object(snap.payload.doc.data())
        }
      })
    }))
  }

  getUserGames$(){
    return this.afs.collection('users').doc(this.fs.getCurrentUserId()).collection('games').snapshotChanges().pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Game>{
          id:snap.payload.doc.id,
          ...new Object(snap.payload.doc.data())
        }
      })
    }))
  }

  async addGame(game:Game){
    await this.afs.firestore.collection('users').doc(this.fs.getCurrentUserId()).collection('games').doc(game.id).set({
      ...game
    })
  }

  async removeGame(game:Game){
    await this.afs.firestore.collection('users').doc(this.fs.getCurrentUserId()).collection('games').doc(game.id).delete();
  }
}
