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
    return this.GameBlock?.color ?? this.DefaultColor ?? "assets/empty.png";
  }
}
