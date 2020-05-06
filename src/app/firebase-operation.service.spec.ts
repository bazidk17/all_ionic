import { TestBed } from '@angular/core/testing';

import { FirebaseOperationService } from './firebase-operation.service';

describe('FirebaseOperationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseOperationService = TestBed.get(FirebaseOperationService);
    expect(service).toBeTruthy();
  });
});
