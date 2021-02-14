import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trainer.ComponentComponent } from './trainer.component.component';

describe('Trainer.ComponentComponent', () => {
  let component: Trainer.ComponentComponent;
  let fixture: ComponentFixture<Trainer.ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Trainer.ComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Trainer.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
