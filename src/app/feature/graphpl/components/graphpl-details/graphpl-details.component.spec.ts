import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphplDetailsComponent } from './graphpl-details.component';

describe('GraphplDetailsComponent', () => {
  let component: GraphplDetailsComponent;
  let fixture: ComponentFixture<GraphplDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphplDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphplDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
