import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>();

  constructor(public firebaseService:FirebaseService) { }

  ngOnInit(): void {
  }

  logout(){
    this.firebaseService.logout();
    this.isLogout.emit();
  }
}
