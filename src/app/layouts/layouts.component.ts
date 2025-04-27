import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';

@Component({
    selector: 'app-layouts',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent, NgClass],
    templateUrl: './layouts.component.html',
    styles: ``
})
export class LayoutsComponent {
  @ViewChild('leftsidenav') sidenav!: ElementRef;

  public readonly isMobile = signal(window.innerWidth <= 768);
  public readonly isOver = signal(!this.isMobile());

  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(window.innerWidth <= 768);
    this.isOver.set(!this.isMobile());
  }

  ngAfterViewInit() {
    this.onResize();
  }

  toggleSidebar(): void {
    this.isOver.set(!this.isOver());
  }
}
