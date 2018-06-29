import { TestBed, inject } from '@angular/core/testing';

import { GerenciadorUsuariosService } from './gerenciador-usuarios.service';

describe('GerenciadorUsuariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GerenciadorUsuariosService]
    });
  });

  it('should be created', inject([GerenciadorUsuariosService], (service: GerenciadorUsuariosService) => {
    expect(service).toBeTruthy();
  }));
});
