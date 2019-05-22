import { TestBed } from '@angular/core/testing';

import { GAPIService } from './gapi.service';

describe('GAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GAPIService = TestBed.get(GAPIService);
    expect(service).toBeTruthy();
  });
});
