import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './firebase.service';
import { Friend } from '../shared/model';
import { map } from 'rxjs/operators'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private afs:AngularFirestore, private fs:FirebaseService) { }

  async addFriend(friend:Friend){
    let currentUser:any;
    await this.afs.firestore.collection('users').doc(this.fs.getCurrentUserId()).get().then(q=>{
      currentUser = q.data();
    } )
    await this.afs.collection('users').doc(this.fs.getCurrentUserId()).collection('friends').doc(friend.id).set({...friend})
    await this.afs.collection('users').doc(friend.id).collection('friends').doc(this.fs.getCurrentUserId()).set({name:currentUser.name,id:currentUser.id})
  }

  removeFriend(friend:Friend){
    this.afs.collection('users').doc(this.fs.getCurrentUserId()).collection('friends').doc(friend.id).delete();
    this.afs.collection('users').doc(friend.id).collection('friends').doc(this.fs.getCurrentUserId()).delete();
  }

  acceptRequest(friend:Friend){
    this.addFriend(friend);
    this.declineRequest(friend);
  }

  declineRequest(friend:Friend){
    this.afs.collection('users').doc(this.fs.getCurrentUserId()).collection('requests').doc(friend.id).delete()
  }

  async sendRequest(friend:Friend){
    let currentUser:any;
    await this.afs.firestore.collection('users').doc(this.fs.getCurrentUserId()).get().then(q=>{
      currentUser = q.data();
    } )
    await this.afs.collection('users').doc(friend.id).collection('requests').doc(this.fs.getCurrentUserId()).set({name:currentUser.name,id:currentUser.id});
  }

  getAllUsers$(){
    return this.afs.collection('users',q=>q.where("id","!=",`${this.fs.getCurrentUserId()}`)).snapshotChanges().pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Friend>{
          id:snap.payload.doc.id,
          ...new Object(snap.payload.doc.data())
        }
      })
    }))
  }

  getFriends$(){
    return this.afs.collection('users').doc(this.fs.getCurrentUserId()).collection('friends').snapshotChanges().pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Friend>{
          id:snap.payload.doc.id,
          name:snap.payload.doc.data()?.name
        }
      })
    }))
  }

  getRequests$(){
    return this.afs.collection('users').doc(this.fs.getCurrentUserId()).collection('requests').snapshotChanges().pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Friend>{
          id:snap.payload.doc.id,
          ...new Object(snap.payload.doc.data())
        }
      })
    }))
  }
}
