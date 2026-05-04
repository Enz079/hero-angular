import { TestBed } from '@angular/core/testing';

import { Herolist } from './herolist';

describe('Herolist', () => {
  let service: Herolist;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Herolist);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
