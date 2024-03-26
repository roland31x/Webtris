import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

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

  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    console.log("Touch started");
    this.press();
  }

  @HostListener('document:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    console.log("Touch ended");
    this.release();
  }

  press(){
    this.pressed.emit();
  }
  release(){
    this.released.emit();
  }
}
