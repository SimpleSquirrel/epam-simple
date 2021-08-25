import { Component, Input, OnInit } from '@angular/core';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/shared/model';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  @Input() lib:boolean = true;
  @Input() game:Game={id:'',name:'',price:0,description:''};
  bought:boolean = false;

  constructor(public gameService:GameService) { }

  ngOnInit():void {
    this.gameService.getUserGames$().forEach(item=>{
      item.filter(game=>{
        if(game.id === this.game.id)
        {
          this.bought=true;
          return;
        }
      })
    })
  }

  addGame():void {
    this.gameService.addGame(this.game)
  }
  removeGame():void {
    this.gameService.removeGame(this.game)
  }
}
