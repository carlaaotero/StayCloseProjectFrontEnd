import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostfComponent } from './postf.component';

describe('PostfComponent', () => {
  let component: PostfComponent;
  let fixture: ComponentFixture<PostfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
