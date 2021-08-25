import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public firebaseAuth:AngularFireAuth,
    public afs:AngularFirestore,
    public router:Router
    ) { }

  async signin(email:string, password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['profile']);
    }).catch((err)=>{
      alert(err)
    })
  }

  async signup(email:string, password:string, name:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      localStorage.setItem('user',JSON.stringify(res.user))

      this.afs.firestore.collection('users').doc(this.getCurrentUserId()).set({name:name,email:email,id:this.getCurrentUserId()})
      this.router.navigate(['profile']);
    }).catch((err)=>{
      alert(err)
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
}