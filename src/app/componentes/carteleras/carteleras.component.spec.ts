import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelerasComponent } from './carteleras.component';

describe('CartelerasComponent', () => {
  let component: CartelerasComponent;
  let fixture: ComponentFixture<CartelerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartelerasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartelerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
