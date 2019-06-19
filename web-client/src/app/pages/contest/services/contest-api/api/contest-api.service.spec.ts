import { TestBed } from '@angular/core/testing';

import { ContestApiService } from './contest-api.service';

describe('ContestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContestApiService = TestBed.get(ContestApiService);
    expect(service).toBeTruthy();
  });
});
