import { TestBed } from '@angular/core/testing';

import { PostfService } from './postf.service';

describe('PostfService', () => {
  let service: PostfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
