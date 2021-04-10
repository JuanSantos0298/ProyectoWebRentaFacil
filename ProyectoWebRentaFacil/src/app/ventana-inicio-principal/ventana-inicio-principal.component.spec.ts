import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaInicioPrincipalComponent } from './ventana-inicio-principal.component';

describe('VentanaInicioPrincipalComponent', () => {
  let component: VentanaInicioPrincipalComponent;
  let fixture: ComponentFixture<VentanaInicioPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaInicioPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaInicioPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
