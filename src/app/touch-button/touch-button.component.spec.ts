import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchButtonComponent } from './touch-button.component';

describe('TouchButtonComponent', () => {
  let component: TouchButtonComponent;
  let fixture: ComponentFixture<TouchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouchButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TouchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
