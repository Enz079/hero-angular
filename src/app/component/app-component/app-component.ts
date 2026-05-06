import { Component, OnInit } from '@angular/core';
import { Hero } from '../../model/hero';
import { HeroCardComponent } from '../hero-card-component/hero-card-component';
import { CommonModule } from '@angular/common';
import { HeroChangeComponent } from '../hero-change-component/hero-change-component';
import { Herolist } from '../../service/herolist';

@Component({
  selector: 'app-app-component',
  standalone: true,
  imports: [HeroCardComponent, HeroChangeComponent, CommonModule],
  templateUrl: './app-component.html',
  styleUrls: ['./app-component.css'],
})

export class AppComponent implements OnInit {
  selectedHero: Hero = {
    nome: '',
    potere: '',
    completata: false,
  };

  heroes: Hero[] = [];

  constructor(private heroService: Herolist) {}

  ngOnInit() {
    this.loadHeroes();
    this.selectedHero = this.heroService.heroSelected;
  }

  get totalCompleted(): number {
    return this.heroes.filter((hero) => hero.completata).length;
  }

  loadHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      console.log('Eroi caricati:', heroes);
      this.heroes = heroes;
    });
  }

  markAsDone(hero: Hero): void {
    hero.completata = true;
    this.heroService.markAsDone(hero).subscribe(() => this.loadHeroes());
  }

  modificaHero(hero: Hero): void {
    this.heroService.selectHero(hero);
    this.selectedHero = this.heroService.heroSelected;
  }

  addHero(hero: Hero): void {
    console.log('addHero chiamato:', hero);
    this.heroService.saveHero(hero).subscribe(() => {
      console.log('Eroe salvato, ricarico lista');
      this.loadHeroes();
      this.heroService.resetSelectedHero();
      this.selectedHero = this.heroService.heroSelected;
    });
  }

  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(() => this.loadHeroes());
  }
}