import { Component, Input, OnChanges } from '@angular/core';
import { Tetromino } from '../game-classes/tetromino';
import { BlockComponent } from '../block/block.component';
import { NgFor } from '@angular/common';
import { GameBlock } from '../game-classes/gameblock';

@Component({
  selector: 'app-block-viewer',
  standalone: true,
  imports: [BlockComponent, NgFor],
  templateUrl: './block-viewer.component.html',
  styleUrl: './block-viewer.component.scss'
})
export class BlockViewerComponent implements OnChanges{

  @Input() toView: Tetromino | null = null;

  @Input() mainText: string = "";

  blockView: GameBlock[][] = [];

  ngOnChanges(){
    this.blockView = (this.toView?.hitbox ?? [])
      .filter(row => row.some(cell => cell))
      .map(row => row.map(cell => new GameBlock(cell ? this.toView?.image : undefined)));
  }
  
}
