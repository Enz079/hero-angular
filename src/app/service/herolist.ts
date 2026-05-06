import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Hero } from '../model/hero';

const API_URL = 'https://cac78ba557f30958492e.free.beeceptor.com';

const HEROES: Hero[] = [
  { _id: '1', id: 1, nome: 'Superman', potere: 'Volo', completata: false },
  { _id: '2', id: 2, nome: 'Batman', potere: 'Intelligenza', completata: false },
  { _id: '3', id: 3, nome: 'Wonder Woman', potere: 'Forza', completata: false },
];

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
      catchError(() => {
        // Se l'API non funziona, usa i dati 
        return of(HEROES);
      }),
    );
  }

  saveHero(hero: Hero): Observable<Hero> {
    if (hero._id) {
      return this.http.put<Hero>(`${API_URL}/${hero._id}`, hero).pipe(
        map(() => hero),
      );
    }
    
    // Per nuovi eroi, aggiungi alla lista locale
    const newId = Math.max(...HEROES.map(h => h.id || 0), 0) + 1;
    const newHero: Hero = {
      ...hero,
      _id: newId.toString(),
      id: newId,
    };
    HEROES.push(newHero);
    
    return this.http.post<Hero>(API_URL, hero).pipe(
      map(() => newHero),
      catchError(() => of(newHero)), // Se l'API fallisce, ritorna il nuovo eroe comunque
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
