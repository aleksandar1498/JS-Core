import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero :Hero;
  constructor() { 
    
  }

  ngOnInit() {
  this.hero = new Hero(14,"Aleksandar");
  }

  edit(hero){
    this.hero = hero;
  }

}