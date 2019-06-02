import { TestBed } from '@angular/core/testing';

import { UserSignApiService } from './user-sign-api.service';

describe('UserSignApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSignApiService = TestBed.get(UserSignApiService);
    expect(service).toBeTruthy();
  });
});
