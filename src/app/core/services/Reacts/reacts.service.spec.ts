/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReactsService } from './reacts.service';

describe('Service: Peacts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReactsService]
    });
  });

  it('should ...', inject([ReactsService], (service: ReactsService) => {
    expect(service).toBeTruthy();
  }));
});
