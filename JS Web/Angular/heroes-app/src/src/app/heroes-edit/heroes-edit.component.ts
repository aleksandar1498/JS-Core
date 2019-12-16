import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroesService } from '../heroes.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-heroes-edit',
  templateUrl: './heroes-edit.component.html',
  styleUrls: ['./heroes-edit.component.css']
})
export class HeroesEditComponent {
  hero :Hero;
  prova="Alex";
  constructor(private service:HeroesService,private route : ActivatedRoute,private router:Router) {
 this.hero = this.service.getHero(this.route.snapshot.paramMap.get("id"));

   }
  edit(hero){ 
    this.hero = hero;
    this.router.navigate(['/heroes']);
  }
}