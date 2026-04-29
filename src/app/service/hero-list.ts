import { Injectable } from '@angular/core';
import { Hero } from '../model/hero';
import { AppComponent } from '../component/app-component/app-component';

@Injectable({
  providedIn: 'root',
})

export class HeroList extends AppComponent {

  get(id: number): Hero {
    let h: Hero | undefined = this.getList().find(h => h.id == id);
    if (!h) {
      h = {} as Hero;
    }
    return h;
  }

  addMission(hero: Hero) {
    if (Object.keys(hero).length === 0) {
      return;
    }
    for (let i = 0; i < this.getList.length; i++) {

      if (hero.id === this.getList()[i].id) {
        this.getList()[i] = hero;
        return;
      }
    }
    this.heroes.push({... hero});
  }
}
