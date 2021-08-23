import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Game } from 'src/app/shared/model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() lib:boolean = true;
  @Input() game:any;

  constructor(public firebaseService:FirebaseService) { }

  ngOnInit(): void {
  }

  addGame()
  {
    this.firebaseService.addGame(this.game.id)
  }
  removeGame()
  {
    this.firebaseService.removeGame(this.game.id)
  }
}
