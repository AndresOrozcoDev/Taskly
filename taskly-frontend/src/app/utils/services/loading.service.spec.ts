import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';
import { take } from 'rxjs';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading to false when hide() is called', () => {
    service.loading$.pipe(take(1)).subscribe((loading) => {
      expect(loading).toBe(false);
    });
    service.hide();
  });

});
