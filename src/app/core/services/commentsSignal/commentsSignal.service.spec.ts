/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentsSignalService } from './commentsSignal.service';

describe('Service: CommentsSignal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentsSignalService]
    });
  });

  it('should ...', inject([CommentsSignalService], (service: CommentsSignalService) => {
    expect(service).toBeTruthy();
  }));
});
