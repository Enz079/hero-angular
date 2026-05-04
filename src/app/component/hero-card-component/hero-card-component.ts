import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../model/hero';

@Component({
  selector: 'app-hero-card-component',
  standalone: true,
  templateUrl: './hero-card-component.html',
  styleUrls: ['./hero-card-component.css'],
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  @Output() onMissionDone = new EventEmitter<Hero>();
  @Output() onDelete = new EventEmitter<Hero>();

  notifyParent(): void {
    this.onMissionDone.emit(this.hero);
  }

  deleteHero(): void {
    this.onDelete.emit(this.hero);
  }
}
