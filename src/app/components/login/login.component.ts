import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() isSignedIn = new EventEmitter<void>();
  constructor(public firebaseService : FirebaseService) { }

  ngOnInit(): void {
    
  }

  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    await this.isSignedIn.emit();
  }
}
