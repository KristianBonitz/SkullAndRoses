import { TestBed } from '@angular/core/testing';

import { PlayerGeneratorService } from './player-generator.service';

describe('PlayerGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerGeneratorService = TestBed.get(PlayerGeneratorService);
    expect(service).toBeTruthy();
  });
});
