import { TestBed } from '@angular/core/testing';

import { MockUserApiService } from './mock-user-api.service';

describe('MockUserApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockUserApiService = TestBed.get(MockUserApiService);
    expect(service).toBeTruthy();
  });
});
