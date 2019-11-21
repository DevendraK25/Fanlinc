import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FandomComponent } from './fandom.component';

describe('FandomPageComponent', () => {
  let component: FandomComponent;
  let fixture: ComponentFixture<FandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
