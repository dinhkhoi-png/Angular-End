import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentadminComponent } from './contentadmin.component';

describe('ContentadminComponent', () => {
  let component: ContentadminComponent;
  let fixture: ComponentFixture<ContentadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
