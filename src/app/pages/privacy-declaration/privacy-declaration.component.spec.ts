import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyDeclarationComponent } from './privacy-declaration.component';

describe('PrivacyDeclarationComponent', () => {
  let component: PrivacyDeclarationComponent;
  let fixture: ComponentFixture<PrivacyDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyDeclarationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
