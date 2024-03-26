export class GameBlock {
    x: number;
    y: number;
    color: string | null;
    settled: boolean;

    constructor(color? : string){
        this.x = 0;
        this.y = 0;
        this.color = color ?? null;
        this.settled = false;
    }
}