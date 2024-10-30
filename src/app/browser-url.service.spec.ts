import { TestBed } from '@angular/core/testing';

import { BrowserUrlService } from './browser-url.service';

describe('BrowserUrlService', () => {
  let service: BrowserUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
