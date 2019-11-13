import { TestBed } from '@angular/core/testing';

import { GameCardService } from './game-card.service';

describe('GameCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameCardService = TestBed.get(GameCardService);
    expect(service).toBeTruthy();
  });
});
