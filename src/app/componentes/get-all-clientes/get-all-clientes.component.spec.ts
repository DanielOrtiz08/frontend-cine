import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllClientesComponent } from './get-all-clientes.component';

describe('GetAllClientesComponent', () => {
  let component: GetAllClientesComponent;
  let fixture: ComponentFixture<GetAllClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
