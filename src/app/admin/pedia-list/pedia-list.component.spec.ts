import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PediaListComponent } from './pedia-list.component';

describe('PediaListComponent', () => {
  let component: PediaListComponent;
  let fixture: ComponentFixture<PediaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PediaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
