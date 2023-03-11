import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartIndicatorsComponent } from './cart-indicators.component';

describe('CartIndicatorsComponent', () => {
  let component: CartIndicatorsComponent;
  let fixture: ComponentFixture<CartIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartIndicatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
