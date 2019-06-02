import { TestBed } from '@angular/core/testing';

import { FormValidationsService } from './form-validations.service';

describe('FormValidationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormValidationsService = TestBed.get(FormValidationsService);
    expect(service).toBeTruthy();
  });
});
