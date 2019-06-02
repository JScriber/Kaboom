import { TestBed } from '@angular/core/testing';

import { CreateGameApiService } from './create-game-api.service';

describe('CreateGameApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateGameApiService = TestBed.get(CreateGameApiService);
    expect(service).toBeTruthy();
  });
});
