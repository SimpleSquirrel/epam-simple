import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'firebase-angular-auth';
  isSignedIn = false
  
  constructor(public firebaseService : FirebaseService, public afs:AngularFirestore){}

  ngOnInit(){
    if(localStorage.getItem('user')!== null)
      this.isSignedIn= true
    else
      this.isSignedIn = false
    console.log("Status login:" + this.isSignedIn)
  }
  // async onSignup(email:string,password:string, name:string){
  //   await this.firebaseService.signup(email,password,name)
  //     if(this.firebaseService.isLoggedIn)
  //       this.isSignedIn = true    
    
  //   //const ref = this.afs.firestore.collection('users').doc('Nero');
  //   //const res = ref.set({super:true})
  // }
  handleLogin(){
    this.isSignedIn = true;
  }
  handleLogout(){
    this.isSignedIn = false
  }
}