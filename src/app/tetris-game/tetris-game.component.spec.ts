import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisGameComponent } from './tetris-game.component';

describe('TetrisGameComponent', () => {
  let component: TetrisGameComponent;
  let fixture: ComponentFixture<TetrisGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TetrisGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TetrisGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
