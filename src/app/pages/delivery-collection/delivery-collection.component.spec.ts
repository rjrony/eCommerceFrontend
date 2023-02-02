import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCollectionComponent } from './delivery-collection.component';

describe('DeliveryCollectionComponent', () => {
  let component: DeliveryCollectionComponent;
  let fixture: ComponentFixture<DeliveryCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
