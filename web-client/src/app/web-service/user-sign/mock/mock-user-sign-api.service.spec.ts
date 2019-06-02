import { TestBed } from '@angular/core/testing';

import { MockUserSignApiService } from './mock-user-sign-api.service';

describe('MockUserSignApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockUserSignApiService = TestBed.get(MockUserSignApiService);
    expect(service).toBeTruthy();
  });
});
