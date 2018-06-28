import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaBarbeariaComponent } from './minha-barbearia.component';

describe('MinhaBarbeariaComponent', () => {
  let component: MinhaBarbeariaComponent;
  let fixture: ComponentFixture<MinhaBarbeariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhaBarbeariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhaBarbeariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
