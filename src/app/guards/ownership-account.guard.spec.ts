import { TestBed, async, inject } from '@angular/core/testing';

import { OwnershipAccountGuard } from './ownership-account.guard';

describe('OwnershipAccountGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnershipAccountGuard]
    });
  });

  it('should ...', inject([OwnershipAccountGuard], (guard: OwnershipAccountGuard) => {
    expect(guard).toBeTruthy();
  }));
});
