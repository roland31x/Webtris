export abstract class Tetromino {
    abstract hitbox: boolean[][];
    abstract image: string;
  
    public alive = true;
  
    public height = 0;
    public offset = 3;
  
    public Rotate() : void {
      this.hitbox = this.RotateHitbox(this.hitbox);
    }
  
    private RotateHitbox(hitbox: boolean[][]) : boolean[][]{
      let clone = hitbox.map((arr) => [...arr]);
  
      for(let i = 0; i < clone.length; i++) {
        for(let j = i + 1; j < clone.length; j++) {
          [clone[i][j], clone[j][i]] = [clone[j][i], clone[i][j]];
        }
      }
      
      for(let i = 0; i < clone.length; i++) {
        clone[i].reverse();
      }
  
      return clone;
    }
  
    public GetRotatedHitbox(rotations: number) : boolean[][] {
      let newHitbox = this.hitbox;
      for(let i = 0; i < rotations; i++){
        newHitbox = this.RotateHitbox(newHitbox);
      }
      return newHitbox;
      
    }
  
  }
  
  export class TetrominoT extends Tetromino {
    override image = "assets/purple.jpg";
    override hitbox: boolean[][] = [
      [false, true, false],
      [true, true, true],
      [false, false, false],
    ];
  }
  
  export class TetrominoL extends Tetromino {
    override image = "assets/orange.jpg";
    override hitbox: boolean[][] = [
      [false, false, true],
      [true, true, true],
      [false, false, false],
    ];
  }
  
  export class TetrominoJ extends Tetromino {
    override image = "assets/blue.jpg";
    override hitbox: boolean[][] = [
      [true, false, false],
      [true, true, true],
      [false, false, false],
    ];
  }
  
  export class TetrominoS extends Tetromino {
    override image = "assets/green.jpg";
    override hitbox: boolean[][] = [
      [false, true, true],
      [true, true, false],
      [false, false, false],
    ];
  }
  
  export class TetrominoZ extends Tetromino {
    override image = "assets/red.jpg";
    override hitbox: boolean[][] = [
      [true, true, false],
      [false, true, true],
      [false, false, false],
    ];
  }
  
  export class TetrominoSq extends Tetromino {
    override image = "assets/yellow.jpg";
    override offset = 4;
    override hitbox: boolean[][] = [
      [true, true],
      [true, true],
    ];
  }
  
  export class TetrominoI extends Tetromino {
    override image = "assets/cyan.jpg";
    override hitbox: boolean[][] = [
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
      [false, false, false, false],
    ];
  }