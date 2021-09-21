import { TestBed } from '@angular/core/testing';

import { PlayerActionService } from './player-action.service';

describe('PlayerActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerActionService = TestBed.get(PlayerActionService);
    expect(service).toBeTruthy();
  });
});
