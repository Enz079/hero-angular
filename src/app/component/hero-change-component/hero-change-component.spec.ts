import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroChangeComponent } from './hero-change-component';

describe('HeroChangeComponent', () => {
  let component: HeroChangeComponent;
  let fixture: ComponentFixture<HeroChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroChangeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
