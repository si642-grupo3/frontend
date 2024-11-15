import { TestBed } from '@angular/core/testing';

import { WalletReportService } from './wallet-report.service';

describe('WalletReportService', () => {
  let service: WalletReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
