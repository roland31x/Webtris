import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  @Input() progress: number = 10;

  get inverseProgress() : string{
    return (100 - this.progress) + "%"
  }

}
