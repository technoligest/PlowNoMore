import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicingMainComponent } from './invoicing-main.component';

describe('InvoicingMainComponent', () => {
  let component: InvoicingMainComponent;
  let fixture: ComponentFixture<InvoicingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
