import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAutorComponent } from './nuevo-autor.component';

describe('NuevoAutorComponent', () => {
  let component: NuevoAutorComponent;
  let fixture: ComponentFixture<NuevoAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoAutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
