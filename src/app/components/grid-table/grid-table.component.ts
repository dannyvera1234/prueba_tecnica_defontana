import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormatDateTimePipe, TextInitialsPipe } from '../../pipe';
import { NotFoundComponent } from '../not-found';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  standalone: true,
  imports: [NgClass, TextInitialsPipe, FormatDateTimePipe, NotFoundComponent],
})
export class GridTableComponent {
  @Input({ required: true }) heards!: { key: string; label: string }[];
  @Input({ required: true }) data!: any;
  @Input({ required: true }) loading: boolean = false;
  @Output() public readonly favorite = new EventEmitter<any>();
  @Output() public readonly openDetails = new EventEmitter<number>();

  public readonly favoriteCharacter = signal<any | null>(null);


  constructor() { }

  markAsFavorite(character: any) {
    if (this.favoriteCharacter() && this.favoriteCharacter().id === character.id) {
      this.favoriteCharacter.set(null);
      this.favorite.emit(null);
      return;
    }
    this.favoriteCharacter.set(character);
    this.favorite.emit(character);
  }

  openDetailsPanel(id: number) {
    if(!id) return;
    this.openDetails.emit(id);
  }

}
