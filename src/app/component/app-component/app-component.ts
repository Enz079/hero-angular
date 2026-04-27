import { Component } from '@angular/core';
import { Hero } from '../../model/hero';
import { HeroCardComponent } from '../hero-card-component/hero-card-component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-app-component',
  imports: [HeroCardComponent, CommonModule],
  templateUrl: './app-component.html',
  styleUrl: './app-component.css',
})

export class AppComponent {

  heroes: Hero[] = [
      { id: 1, nome: 'Spider-Man', potere: 'Ragnatele', completata: false },
      { id: 2, nome: 'Iron Man', potere: 'Tecnologia', completata: false },
      { id: 3, nome: 'Thor', potere: 'Tuono', completata: false }
    ];
  
  totalCompleted = 0;  

  markAsDone(hero : Hero) : void{

    hero.completata = true;
    this.totalCompleted++;
  }
  
  addHero(hero : Hero) : void{

    for(let h of this.heroes){

      if(h.id == hero.id){
        
        return;
      }
    }

    if(hero.id == 0){
      
      hero.id = this.heroes.length ++;
    }
    this.heroes.push(hero);

  }

  selectedHero !: Hero;

  modificaHero(hero: Hero) : void{

    this.selectedHero = hero;

  }
  
}
