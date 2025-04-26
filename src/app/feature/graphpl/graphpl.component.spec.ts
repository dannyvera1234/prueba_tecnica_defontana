import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphplComponent } from './graphpl.component';

describe('GraphplComponent', () => {
  let component: GraphplComponent;
  let fixture: ComponentFixture<GraphplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphplComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
