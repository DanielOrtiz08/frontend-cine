import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiteriasComponent } from './confiterias.component';

describe('ConfiteriasComponent', () => {
  let component: ConfiteriasComponent;
  let fixture: ComponentFixture<ConfiteriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiteriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
