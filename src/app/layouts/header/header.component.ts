import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styles: ``
})
export class HeaderComponent {
  @Output() toggleMobileNav = new EventEmitter<void>();





}

