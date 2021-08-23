import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData:any;

  @Output() isLogout = new EventEmitter<void>();
  constructor(public firebaseService:FirebaseService, public afs:AngularFirestore) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    if(user!==null)
    {
      const id = this.firebaseService.getCurrentUserId();
      this.afs.firestore.collection('users').doc(id).get().then((q)=>{
      this.userData = q.data()
    })
    }
  }

  logout(){
    this.firebaseService.logout();
    this.isLogout.emit();
  }

  updateData(name:string,age:number,id:string,email:string){
    this.firebaseService.setData({
      name:name,
      age:age,
      id:id,
      email:email
    })
  }
}
