import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRestFiltrsComponent } from './api-rest-filtrs.component';

describe('ApiRestFiltrsComponent', () => {
  let component: ApiRestFiltrsComponent;
  let fixture: ComponentFixture<ApiRestFiltrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiRestFiltrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiRestFiltrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
