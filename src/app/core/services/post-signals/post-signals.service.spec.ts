/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostSignalsService } from './post-signals.service';

describe('Service: PostSignals', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostSignalsService]
    });
  });

  it('should ...', inject([PostSignalsService], (service: PostSignalsService) => {
    expect(service).toBeTruthy();
  }));
});
