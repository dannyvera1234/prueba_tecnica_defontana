import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRestDetailsComponent } from './api-rest-details.component';

describe('ApiRestDetailsComponent', () => {
  let component: ApiRestDetailsComponent;
  let fixture: ComponentFixture<ApiRestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiRestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiRestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
