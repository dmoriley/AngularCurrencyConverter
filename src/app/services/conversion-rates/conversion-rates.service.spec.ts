import { TestBed, inject } from '@angular/core/testing';

import { ConversionRatesService } from './conversion-rates.service';

describe('ConversionRatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversionRatesService]
    });
  });

  it('should be created', inject([ConversionRatesService], (service: ConversionRatesService) => {
    expect(service).toBeTruthy();
  }));
});
