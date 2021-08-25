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
  handleLogin(){
    this.isSignedIn = true;
  }
  handleLogout(){
    this.isSignedIn = false
  }
}