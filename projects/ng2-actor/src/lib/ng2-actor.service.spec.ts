import { TestBed } from '@angular/core/testing';

import { Ng2ActorService } from './ng2-actor.service';

describe('Ng2ActorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ng2ActorService = TestBed.get(Ng2ActorService);
    expect(service).toBeTruthy();
  });
});
