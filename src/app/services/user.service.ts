import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../shared/model'
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs:AngularFirestore, private fs:FirebaseService) { }

  getCurrentUserInfo$(){
    return this.afs.firestore.collection('users').doc(this.fs.getCurrentUserId()).get().then(item=>{
      return item.data();
    })
  }

  updateProfile$(changes:User){
    this.afs.collection('users').doc(this.fs.getCurrentUserId()).set(changes,{merge:true});
  }
}
