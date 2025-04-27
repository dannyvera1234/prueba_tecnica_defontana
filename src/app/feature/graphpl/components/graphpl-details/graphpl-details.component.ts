import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { GRAPHPL_STORE } from '../../store/graphpl.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-graphpl-details',
  imports: [NgClass],
  templateUrl: './graphpl-details.component.html',
  styles: ``
})
export class GraphplDetailsComponent {
  @ViewChild('panelContainer') menuContainer!: ElementRef;
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.menuContainer && !this.menuContainer.nativeElement.contains(event.target)) {
      this.graphqlStore.isOpenDetails(null);
    }
  }

  public graphqlStore = inject(GRAPHPL_STORE);


  constructor() {}


  closeConfigPanel() {
    this.graphqlStore.isOpenDetails(null);
  }
}
