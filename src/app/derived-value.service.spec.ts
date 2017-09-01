import { TestBed, inject } from '@angular/core/testing';

import { DerivedValueService } from './derived-value.service';

describe('DerivedValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DerivedValueService]
    });
  });

  it('should be created', inject([DerivedValueService], (service: DerivedValueService) => {
    expect(service).toBeTruthy();
  }));
});
