import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Hero } from '../model/hero';

const API_URL = 'https://crudcrud.com/api/7587050510f14b38aed98fd7e8bdb3ef/heroes';

@Injectable({
  providedIn: 'root',
})
export class Herolist {
  private selectedHero: Hero = {
    nome: '',
    potere: '',
    completata: false,
  };

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(API_URL).pipe(
      map((heroes) =>
        heroes.map((hero, index) => ({
          ...hero,
          id: hero.id ?? index + 1,
        })),
      ),
    );
  }

  saveHero(hero: Hero): Observable<Hero> {
    if (hero._id) {
      return this.http.put<Hero>(`${API_URL}/${hero._id}`, hero).pipe(
        map(() => hero),
      );
    }
    return this.http.post<Hero>(API_URL, hero).pipe(
      map((createdHero) => ({
        ...createdHero,
        id: createdHero.id ?? hero.id,
      })),
    );
  }

  deleteHero(hero: Hero): Observable<void> {
    if (!hero._id) {
      return new Observable((subscriber) => {
        subscriber.next();
        subscriber.complete();
      });
    }
    return this.http.delete<void>(`${API_URL}/${hero._id}`);
  }

  markAsDone(hero: Hero): Observable<Hero> {
    const updatedHero = { ...hero, completata: true };
    if (!hero._id) {
      return new Observable((subscriber) => {
        subscriber.next(updatedHero);
        subscriber.complete();
      });
    }
    return this.http.put<Hero>(`${API_URL}/${hero._id}`, updatedHero).pipe(map(() => updatedHero));
  }

  get heroSelected(): Hero {
    return this.selectedHero;
  }

  selectHero(hero: Hero): void {
    this.selectedHero = { ...hero };
  }

  resetSelectedHero(): void {
    this.selectedHero = {
      nome: '',
      potere: '',
      completata: false,
    };
  }
}
