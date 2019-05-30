import { TestBed } from '@angular/core/testing';

import { MockJoinGameApiService } from './mock-join-game-api.service';

describe('MockJoinGameApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockJoinGameApiService = TestBed.get(MockJoinGameApiService);
    expect(service).toBeTruthy();
  });
});
