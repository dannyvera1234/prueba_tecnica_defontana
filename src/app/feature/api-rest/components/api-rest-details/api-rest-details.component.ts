import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal, ViewChild } from '@angular/core';
import { RickAndMortyService } from '../../../../service';
import { finalize, forkJoin, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-api-rest-details',
  standalone: true,
  imports: [NgClass],
  templateUrl: './api-rest-details.component.html',
  styles: ``
})
export class ApiRestDetailsComponent {
  @ViewChild('panelContainer') menuContainer!: ElementRef;
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.menuContainer && !this.menuContainer.nativeElement.contains(event.target)) {
      this.isConfigOpen.set(true);
      this.closeConfig.emit(false);
    }
  }
  @Input({ required: true }) set id(id: string) {
    this.getCharacter(id);
    this.isConfigOpen.set(true);
  }

  @Output() public readonly closeConfig = new EventEmitter<any>();
  public readonly loading = signal(false);
  public readonly character = signal<null | any>(null);
  public readonly isConfigOpen = signal(false);


  constructor(private service: RickAndMortyService) {
  }


  closeConfigPanel() {
    this.isConfigOpen.set(true);
    this.closeConfig.emit(false);
  }

  getCharacter(id: string): void {
    this.loading.set(true);
    this.service.getCharacter(id).pipe(
      switchMap((character) => {
        const locationId = this.extractIdFromUrl(character.location.url);
        const episodeId = this.extractIdFromUrl(character.episode[0]);

        return forkJoin({
          character: of(character),
          location: this.service.getLocation(locationId),
          episode: this.service.getEpisode(episodeId)
        });
      }),
      tap(({ character, location, episode }) => {
        this.character.set({
          ...character,
          location,
          episode
        });
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }

  extractIdFromUrl(url: string): string {
    return url.split('/').pop() || '';
  }
}
