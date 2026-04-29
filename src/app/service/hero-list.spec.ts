import { TestBed } from '@angular/core/testing';

import { HeroList } from './hero-list';

describe('HeroList', () => {
  let service: HeroList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
