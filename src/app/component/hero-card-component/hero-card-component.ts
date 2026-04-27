import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../model/hero';
import { HeroChangeComponent } from '../hero-change-component/hero-change-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-card-component',
  imports: [HeroCardComponent, HeroChangeComponent, CommonModule],
  templateUrl: './hero-card-component.html',
  styleUrl: './hero-card-component.css',
})
export class HeroCardComponent {

  @Input() hero !: Hero;
  @Output() onMissionDone = new EventEmitter<Hero>();

  notifyParent() {
    this.onMissionDone.emit(this.hero);
  }

}
