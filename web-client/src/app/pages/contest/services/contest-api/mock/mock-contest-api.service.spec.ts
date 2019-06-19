import { TestBed } from '@angular/core/testing';

import { MockContestApiService } from './mock-contest-api.service';

describe('MockContestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockContestApiService = TestBed.get(MockContestApiService);
    expect(service).toBeTruthy();
  });
});
