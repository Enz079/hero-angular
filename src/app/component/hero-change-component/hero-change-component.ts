import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../model/hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-hero-change-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-change-component.html',
  styleUrl: './hero-change-component.css',
})
export class HeroChangeComponent {

  @Input() hero : Hero = {

    id: 0,
    nome: '',
    potere: '',
    completata: false 
  }

  @Output() onSave = new EventEmitter<Hero>();

  save() : void{

    this.onSave.emit(this.hero);

  }
}
