import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Game } from '../../shared/model'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  games$:Observable<Game[]>= new Observable();
  searched$:any;

  searchIsEmpty:boolean=true;

  filters = [{ type:"strategy"}, {type:"rpg"}, {type:"shooter"},{type:"any"}]

  maxPrice:number=0;
  minPrice:number=0;
  price:number=0;

  currentPrice:number=0;
  type:string='Ya ne rabotayu, idi nahui';

  constructor(public gameService:GameService) { 
    
  }

  ngOnInit(): void {
    this.games$ = this.gameService.getAllGames$();    
    this.games$.forEach(item=>{
      this.maxPrice = Math.max.apply(Math, item.map(x=>x.price))
    })
  }

  search(spec:string){
    this.searchIsEmpty = !spec?true:false;
    this.games$.forEach(games=>{
      this.searched$ = games.filter(
      game=>game.name.includes(spec) 
      // && 
      // game.price<=this.currentPrice
      // && 
      // this.type==="any"?true:game.genre===this.type
      )
    })
    
  }
}
