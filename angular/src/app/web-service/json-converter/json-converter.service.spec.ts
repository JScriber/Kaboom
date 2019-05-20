import { TestBed } from '@angular/core/testing';

import { JsonConverterService } from './json-converter.service';

describe('JsonConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonConverterService = TestBed.get(JsonConverterService);
    expect(service).toBeTruthy();
  });
});
