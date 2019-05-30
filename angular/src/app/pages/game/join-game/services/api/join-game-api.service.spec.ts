import { TestBed } from '@angular/core/testing';

import { JoinGameApiService } from './join-game-api.service';

describe('JoinGameApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinGameApiService = TestBed.get(JoinGameApiService);
    expect(service).toBeTruthy();
  });
});
