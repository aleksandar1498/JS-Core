import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroesService } from '../heroes.service';
import {RouterLink} from '@angular/router';

@Component({ 
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:Hero[];
  constructor(private service:HeroesService) { 
   
  }

  ngOnInit() {
    this.heroes = this.service.getHeroes();
  }

  

}