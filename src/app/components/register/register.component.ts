import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //isSignedIn = false;

  constructor(public fs : FirebaseService) { }

  ngOnInit(): void {
  }
  async onSignup(email:string,password:string, name:string){
    await this.fs.signup(email, password, name)
  }
}
