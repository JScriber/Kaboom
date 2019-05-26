import { TestBed } from '@angular/core/testing';

import { MockCreateGameApiService } from './mock-create-game-api.service';

describe('MockCreateGameApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockCreateGameApiService = TestBed.get(MockCreateGameApiService);
    expect(service).toBeTruthy();
  });
});
