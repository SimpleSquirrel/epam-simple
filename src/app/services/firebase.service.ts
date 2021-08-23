import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { User } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false
  constructor(
    public firebaseAuth : AngularFireAuth,
    public afs : AngularFirestore,
    public router : Router
    ) { }

  async signin(email: string, password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['profile']);
    }).catch((err)=>{
      console.log("FUCK YOU")
    })
  }

  async signup(email: string, password : string, name:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true

      localStorage.setItem('user',JSON.stringify(res.user))
      const user = this.afs.firestore.collection('users').doc(this.getCurrentUserId())
      user.set({
        id:this.getCurrentUserId(),
        name:name,
        email:email,
        age:0
      })
      this.router.navigate(['profile']);
    })
  }

  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }

  getCurrentUserId() {
    return JSON.parse((localStorage.getItem('user')||'').toString()).uid
  }

  //Game controllers
  async addGame(gameId:string){
    let gameName:any;
    await this.afs.firestore.collection('games').doc(gameId).get().then((q)=>{
      gameName = q.data()?.name
    })
    await this.afs.firestore.collection('users').doc(this.getCurrentUserId()).collection('games').doc(gameId).set({
      name:gameName
    })
  }

  async removeGame(gameId:string){
    await this.afs.firestore.collection('users').doc(this.getCurrentUserId()).collection('games').doc(gameId).delete();
  }

  //Friend controller
  async addFriend(friendId:string){
    let user:any = {};
    await this.afs.firestore.collection('users').doc(friendId).get()
    .then((q)=>{
      user.name = q.data()?.name;
      user.id = q.data()?.id
    })
    await this.afs.firestore.collection('users').doc(this.getCurrentUserId()).collection('friends').doc(friendId).set({
      name:user.name,
      id:user.id
    })
    await this.afs.firestore.collection('users').doc(this.getCurrentUserId()).get()
    .then((q)=>{
      user.name = q.data()?.name;
      user.id = q.data()?.id
    })
    await this.afs.firestore.collection('users').doc(friendId).collection('friends').doc(this.getCurrentUserId()).set({
      name:user.name,
      id:user.id
    })
  }

  async removeFriend(friendId:string){
    await this.afs.firestore.collection('users').doc(this.getCurrentUserId()).collection('friends').doc(friendId).delete();
    await this.afs.firestore.collection('users').doc(friendId).collection('friends').doc(this.getCurrentUserId()).delete();
  }

  //Request controller
  async acceptRequest(friendId:string){
    this.addFriend(friendId);
    this.declineRequest(friendId);
  }

  async declineRequest(friendId:string){
    await this.afs.firestore.collection('users').doc(this.getCurrentUserId()).collection('requests').doc(friendId).delete();
  }

  async sendRequest(friendId:string){
    let user:any={};
    await this.afs.firestore.collection('users').doc(friendId).get().then((q)=>{
      user.name = q.data()?.name
      user.id = q.data()?.id
    }).catch((err)=>console.log(err))
    
    await this.afs.firestore.collection('users').doc(friendId).collection('requests').doc(this.getCurrentUserId()).set({
      name:user.name,
      id:user.id
    })
  }

  //Update user profile info
  setData(user:User)
  {
    this.afs.firestore.collection('users').doc(this.getCurrentUserId()).set(
      {
        name:user.name,
        age:user.age,
        email:user.email,
        id:user.id
      }
    )
  }
}