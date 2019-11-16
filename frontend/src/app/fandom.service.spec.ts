import { TestBed } from '@angular/core/testing';

import { FandomService } from './fandom.service';

describe('FandomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FandomService = TestBed.get(FandomService);
    expect(service).toBeTruthy();
  });
});
