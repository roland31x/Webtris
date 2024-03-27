import { NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-touch-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './touch-button.component.html',
  styleUrl: './touch-button.component.scss'
})
export class TouchButtonComponent {

  @Input() text: string = "Button";
  @Input() size: number = 10;
  @Input() repeat: boolean = true;
  @Input() holdEvent: boolean = false;
  @Input() holdEventThreshold: number = 1000;

  @Output() pressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() released: EventEmitter<void> = new EventEmitter<void>();

  @Output() held: EventEmitter<void> = new EventEmitter<void>();

  private _pressedAmount: number = 0;
  get pressedAmount() : number{
    return this._pressedAmount;
  }
  set pressedAmount(value: number){
    this._pressedAmount = value;
    if(this.holdEvent && this._pressedAmount * 5 == this.holdEventThreshold){
      this.held.emit();
    }
  }

  get holdProgress(){
    let actual = ((this.pressedAmount * 5) / this.holdEventThreshold) * 100;

    return Math.round(Math.min(actual, 100));
  }

  private repeat_press : any;
  private get repeat_active() : boolean{
    return this.repeat_press;
  }

/*
 
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if(event.target == this.touchButton.nativeElement){
      console.log("Touch started");
      this.press();
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if(event.target == this.touchButton.nativeElement){
      console.log("Touch end");
      this.release();
    }
  }
*/
  press(){
    this.pressedAmount = 1;
    this.pressed.emit();
    if(this.repeat){
      if(this.repeat_active){
        clearInterval(this.repeat_press);
      }
      this.repeat_press = setInterval(() => {
        if(this.pressedAmount % 50 == 0){
          this.pressed.emit(); 
        }
        this.pressedAmount++
      }, 5);
    }
    
  }
  release(){
    clearInterval(this.repeat_press);
    this.pressedAmount = 0;
    this.released.emit();
  }
  
  get height(){
    return "calc((" + this.size + "vw + " + this.size + "vh) / 2)";
  }

  get width(){
    return "calc((" + this.size + "vw + " + this.size + "vh) / 2)";
  }
}
