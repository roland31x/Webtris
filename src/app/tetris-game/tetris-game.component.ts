import { Component, HostListener } from '@angular/core';
import { GameBlock } from './game-classes/gameblock';
import { NgFor, NgIf } from '@angular/common';
import { BlockComponent } from './block/block.component';
import { Observable } from 'rxjs';
import { Tetromino, TetrominoI, TetrominoJ, TetrominoL, TetrominoS, TetrominoSq, TetrominoT, TetrominoZ } from './game-classes/tetromino';
import { BlockViewerComponent } from './block-viewer/block-viewer.component';
import { TouchButtonComponent } from '../touch-button/touch-button.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


@Component({
  selector: 'app-tetris-game',
  standalone: true,
  imports: [NgFor, NgIf, BlockComponent, BlockViewerComponent, TouchButtonComponent, ProgressBarComponent],
  templateUrl: './tetris-game.component.html',
  styleUrl: './tetris-game.component.scss'
})
export class TetrisGameComponent {

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.handlePress(event.key.toUpperCase());
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.handleRelease(event.key.toUpperCase());
  }

  handlePress(key : string){
    if(!this.playing){
      return;
    }
    console.log(key);
    switch(key){
      case "ARROWLEFT":
        this.moveBlock(-1);
        break;
      case "ARROWRIGHT":
        this.moveBlock(1);
        break;
      case "ARROWUP":
        this.rotateBlock();
        break;
      case "C":
        this.holdFunction();
        break;
      case "ARROWDOWN":
        this.quickFall = true;
        break;
    }
  }

  handleRelease(key : string){
    switch(key){
      case "ARROWDOWN":
        this.quickFall = false;
        break;
    }
  }

  GameBlocks: GameBlock[][] = Array.from({length: 22}, () => Array.from({length: 10}, () => new GameBlock()));

  currentBlock: Tetromino | null = null;
  nextBlock: Tetromino | null = null;
  heldBlock: Tetromino | null = null;

  get falltimer(): number {
    return 1000 - (((this.currentLevel > 19 ? 19 : this.currentLevel ) - 1) * 50);
  }
  quickFall: boolean = false;

  drawTimer = setInterval(() => { this.draw(); }, 10);
  doDraw: boolean = true;
  drawCurrentBlock: boolean = true;

  playing: boolean = false;
  gameOver: boolean = false;

  private blockList: Tetromino[] = [];

  private currentList: Tetromino[] = [];

  private _currentLevel: number = 1;
  get currentLevel(): number {
    return this._currentLevel;
  }
  set currentLevel(value: number) {
    this._currentLevel = value;
  }

  private _currentScore: number = 0;
  get currentScore(): number {
    return this._currentScore;
  }
  set currentScore(value: number) {
    this._currentScore = value;
  }

  _linesCleared: number = 0;
  get linesCleared(): number {
    return this._linesCleared;
  }
  set linesCleared(value: number) {
    this._linesCleared = value;
    if(this._linesCleared >= this.levelRequirement){
      this._linesCleared -= this.levelRequirement;
      this.currentLevel++;
    }
  }

  get currentLevelProgress(): number {
    return (this.linesCleared / this.levelRequirement) * 100;
  }

  get levelRequirement(): number {
    return 10 * this.currentLevel;
  }


  constructor(){
    this.resetGame();
  }

  resetGame(){
    this.playing = false;
    this.currentBlock = null;
    this.nextBlock = null;
    this.heldBlock = null;
    this.currentList = this.getRandomList();
    this.resetBlockList();
    this.GameBlocks.forEach(row => row.forEach(cell => cell.settled = false));

    this.currentLevel = 1;
    this.linesCleared = 0;
    this.currentScore = 0;
    this.gameOver = false;
  
  }

  resetBlockList() {
    this.blockList = [
      new TetrominoI(),
      new TetrominoL(),
      new TetrominoJ(), 
      new TetrominoS(),
      new TetrominoZ(), 
      new TetrominoSq(), 
      new TetrominoT()
    ];
  }

  holdFunction() : void {
    if(this.heldBlock){
      this.currentList.push(this.nextBlock!);
      this.nextBlock = this.heldBlock;
      this.heldBlock = null;
    }
    else{
      this.heldBlock = this.nextBlock;
      this.nextBlock = this.currentList.pop()!;
      this.checkRefill();
    }
  }
  
  checkRefill() : void {
    if(this.currentList.length == 0){
      this.currentList = this.getRandomList();
      this.resetBlockList();
    }
  }

  getRandomList(): Tetromino[] {
    let toReturn: Tetromino[] = [];
    this.blockList.sort(() => Math.random() - 0.5).map(x => toReturn.push(x));

    return toReturn;
  }

  draw() : void {

    if(!this.doDraw){
      return;
    }
    
    for(let i = 0; i < this.GameBlocks.length; i++){
      for(let j = 0; j < this.GameBlocks[i].length; j++){
        if(!this.GameBlocks[i][j].settled){
          this.GameBlocks[i][j].color = null;
        }
      }
    }

    if(this.currentBlock != null && this.drawCurrentBlock){
      for(let i = 0; i < this.currentBlock!.hitbox.length; i++){
        for(let j = 0; j < this.currentBlock!.hitbox.length; j++){
          if(this.currentBlock!.hitbox[i][j]){
            this.GameBlocks[this.currentBlock.height + i][this.currentBlock.offset + j].color = this.currentBlock!.image;
          } 
        }
      }
    }
    
  }

  fallBlock() : void {

    if(this.currentBlock != null){
      let newHeight = this.currentBlock.height + 1;

      if(this.HitboxCheck(this.currentBlock.hitbox, newHeight, this.currentBlock.offset)){
        this.currentBlock.height = newHeight;
      }
      else{
        this.killBlock();
      }

    }
  }

  killBlock(){
    this.currentBlock!.alive = false;
  }

  moveBlock(direction: number) : void {
    if(this.currentBlock != null){
      let newoffset = this.currentBlock.offset + direction;

      for(let heightdiff = 0; heightdiff <= 1; heightdiff++){
        if(this.HitboxCheck(this.currentBlock.hitbox, this.currentBlock.height + heightdiff, newoffset)){
          this.currentBlock.offset = newoffset;
          this.currentBlock.height = this.currentBlock.height + heightdiff;
          return;
        }
      }

    }
  }

  rotateBlock() {
    if(this.currentBlock != null){
      for(let rotation = 1; rotation < 4; rotation++){
        let newhitbox = this.currentBlock.GetRotatedHitbox(rotation);
        for(let heightdiff = 0; heightdiff <= 1; heightdiff++){
          for(let offsetdiff of [0, -1, 1]){
            if(this.HitboxCheck(newhitbox, this.currentBlock.height + heightdiff, this.currentBlock.offset + offsetdiff)){
              this.currentBlock.hitbox = newhitbox;
              this.currentBlock.height = this.currentBlock.height + heightdiff;
              this.currentBlock.offset = this.currentBlock.offset + offsetdiff;
              return;
            }
          }
        }
      }
    }
  }

  HitboxCheck(hitbox: boolean[][], height: number, offset: number) : boolean {
    
    for(let i = 0; i < hitbox.length; i++){
      for(let j = 0; j < hitbox.length; j++){
        if(hitbox[i][j]){
          if(height + i < 0 || height + i >= this.GameBlocks.length || offset + j < 0 || offset + j >= this.GameBlocks[0].length){
            return false;
          }
          if(this.GameBlocks[height + i][offset + j].settled){
            return false;
          }
        } 
      }
    }

    return true;
  }

  public StopGame(){
    this.playing = false;
    this.resetGame();
  }

  public async PlayGame() {

    if(this.playing){
      return;
    }

    this.resetGame();

    this.playing = true;
    
    let number = 0;

    while(this.playing){
      
      let canSpawn = this.spawnBlock();
      if(!canSpawn){
        this.currentBlock = null;
        this.playing = false;
        break;
      }

      await this.blockLifecycle();

      this.settle();

      await this.checkForClear();

      number++;
    }

    this.gameOver = true;
  }

  async checkForClear() : Promise<void> {

    let toClear = [];

    for(let row = this.GameBlocks.length - 1; row >= 0; row--){
      if(this.GameBlocks[row].every(cell => cell.settled)){
        toClear.push(row);
      }
    }
   
    if(toClear.length == 0){
      return;
    }

    this.drawCurrentBlock = false;

    for(let block of this.blockList){
      for(let row of toClear){
        this.GameBlocks[row].forEach(cell => cell.color = block.image);
      }
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 80);
      });
    }

    for(let row of toClear){
      this.GameBlocks[row].forEach(cell => cell.settled = false);
    }
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 50);
    });

    this.linesCleared += toClear.length;

    let scores = [40, 100, 300, 1200]
    this.currentScore += scores[toClear.length - 1] * this.currentLevel;

    while(toClear.length > 0){
      let row = toClear.pop()!;

      this.GameBlocks[row].forEach(cell => cell.settled = false);
      let current = row;
      let j = row - 1;

      while(j >= 0){
        for(let k = 0; k < this.GameBlocks[j].length; k++){
          this.GameBlocks[current][k].color = this.GameBlocks[j][k].color;
          this.GameBlocks[current][k].settled = this.GameBlocks[j][k].settled;
        }
        j--;
        current--;
      }
    }
    
    this.drawCurrentBlock = true;

  }

  settle() : void {
    if(this.currentBlock != null){
      for(let i = 0; i < this.currentBlock.hitbox.length; i++){
        for(let j = 0; j < this.currentBlock.hitbox.length; j++){
          if(this.currentBlock.hitbox[i][j]){
            let toAlter = this.GameBlocks[this.currentBlock.height + i][this.currentBlock.offset + j];
            toAlter.color = this.currentBlock.image;
            toAlter.settled = true;
            
          }
        }
      }
    }

    this.currentScore += this.currentBlock!.height!;
  }

  async blockLifecycle() : Promise<void> {

    while(this.currentBlock?.alive){
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), this.quickFall? 100 : this.falltimer);
      });
      this.fallBlock();  
    }

  }

  spawnBlock() : boolean {

    if(this.currentBlock == null){
      this.currentBlock = this.currentList.pop()!;
    }
    else{
      this.currentBlock = this.nextBlock;
    }

    this.nextBlock = this.currentList.pop()!;
    this.checkRefill();

    return this.HitboxCheck(this.currentBlock!.hitbox, this.currentBlock!.height, this.currentBlock!.offset);
  }
}