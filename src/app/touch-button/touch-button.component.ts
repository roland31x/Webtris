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

  @Output() pressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() released: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('touchButton') touchButton: any;

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

  press(){
    this.pressed.emit();
  }
  release(){
    this.released.emit();
  }
}
