import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisGananciasComponent } from './mis-ganancias.component';

describe('MisGananciasComponent', () => {
  let component: MisGananciasComponent;
  let fixture: ComponentFixture<MisGananciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisGananciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisGananciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
