import { TestBed } from '@angular/core/testing';

import { WaitingRoomSocket } from './waiting-room.service';

describe('WaitingRoomSocket', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaitingRoomSocket = TestBed.get(WaitingRoomSocket);
    expect(service).toBeTruthy();
  });
});
