import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentosConcluidosComponent } from './agendamentos-concluidos.component';

describe('AgendamentosConcluidosComponent', () => {
  let component: AgendamentosConcluidosComponent;
  let fixture: ComponentFixture<AgendamentosConcluidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamentosConcluidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentosConcluidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
