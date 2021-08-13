/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserSignalService } from './user-signal.service';

describe('Service: UserSignal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSignalService]
    });
  });

  it('should ...', inject([UserSignalService], (service: UserSignalService) => {
    expect(service).toBeTruthy();
  }));
});
