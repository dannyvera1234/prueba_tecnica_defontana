import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styles: [`

    .custom-scrollbar::-webkit-scrollbar {
      width: 3px; /* Hace la barra más delgada */
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.4);
    }

    @media (max-width: 768px) {
      .custom-scrollbar::-webkit-scrollbar {
        display: none;
      }
    }
     `]
})
export class SidebarComponent {
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isMobile && this.showToggle) {
      if (!this.elRef.nativeElement.contains(event.target)) {
        this.showToggle = false;

      }
    }
  }

  @Input({ required: true }) showToggle = true;
  @Input({ required: true }) isMobile = true;


  constructor(private elRef: ElementRef) {
  }


  defontanaRoute = routes.find((route: any) => route.path === 'defontana');
  menuRoutes = this.defontanaRoute?.children?.filter(route => {
    return (
      route?.data &&
      route?.data['title'] &&
      route?.data['icon']
    )
  });
}
