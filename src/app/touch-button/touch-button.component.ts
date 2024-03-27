import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-touch-button',
  standalone: true,
  imports: [],
  templateUrl: './touch-button.component.html',
  styleUrl: './touch-button.component.scss'
})
export class TouchButtonComponent {

  @Input() text: string = "Button";
  @Input() size: number = 10;
  @Input() repeat: boolean = true;

  @Output() pressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() released: EventEmitter<void> = new EventEmitter<void>();

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
    this.pressed.emit();
    if(this.repeat_active){
      clearInterval(this.repeat_press);
    }
    if(this.repeat){
      this.repeat_press = setInterval(() =>this.pressed.emit(), 250);
    }
    
  }
  release(){
    clearInterval(this.repeat_press);
    this.released.emit();
  }
  
  get height(){
    return "calc((" + this.size + "vw + " + this.size + "vh) / 2)";
  }

  get width(){
    return "calc((" + this.size + "vw + " + this.size + "vh) / 2)";
  }
}
