import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSignedIn = false;

  constructor(
    public afs:AngularFirestore,
    public firebaseService : FirebaseService
    ) { }

  ngOnInit(): void {
    //const ref = this.afs.firestore.collection('users').doc('Nero');
    //const res = ref.set({super:true})
  }
  async onSignup(email:string,password:string, name:string){
    await this.firebaseService.signup(email, password, name)
    //  if(this.firebaseService.isLoggedIn)
    //    this.isSignedIn = true;
    //const ref = this.afs.firestore.collection('users').doc('Nero');
    //const res = ref.set({super:true})
  }
}
