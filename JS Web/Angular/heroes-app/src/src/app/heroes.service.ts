import { Injectable } from '@angular/core';
import {Hero} from './hero';

@Injectable()
export class HeroesService {
  heroes : Hero[];
  constructor() {
    this.heroes = [];
    this.heroes.push(new Hero(14,"Aleksandar"));
    this.heroes.push(new Hero(15,"Vesi"));
    this.heroes.push(new Hero(16,"Petar"));
   }

   getHeroes(){
     return this.heroes;
   }
   getHero(id:number){
     return this.heroes.find(h => h.id == id);
   }

}