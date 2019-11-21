import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FandomPageComponent } from './fandom-page.component';

describe('FandomPageComponent', () => {
  let component: FandomPageComponent;
  let fixture: ComponentFixture<FandomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FandomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FandomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
