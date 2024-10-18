import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioLoguinComponent } from './usuario-loguin.component';

describe('UsuarioLoguinComponent', () => {
  let component: UsuarioLoguinComponent;
  let fixture: ComponentFixture<UsuarioLoguinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioLoguinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioLoguinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
