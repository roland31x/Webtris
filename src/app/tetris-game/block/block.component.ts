import { Component, Input } from '@angular/core';
import { GameBlock } from '../game-classes/gameblock';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent {

  @Input() GameBlock: GameBlock | null = null;

  @Input() DefaultColor: string | null = null;

  Image() : string | null{
    return this.GameBlock?.color ?? this.DefaultColor ?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwAB/AXNK9YAAAAASUVORK5CYII=";
  }
}
