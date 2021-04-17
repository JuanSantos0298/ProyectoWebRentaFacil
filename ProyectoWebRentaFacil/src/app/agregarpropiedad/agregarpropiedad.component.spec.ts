import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarpropiedadComponent } from './agregarpropiedad.component';

describe('AgregarpropiedadComponent', () => {
  let component: AgregarpropiedadComponent;
  let fixture: ComponentFixture<AgregarpropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarpropiedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
