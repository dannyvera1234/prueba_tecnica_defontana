import { KeyValuePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-totales',
    imports: [KeyValuePipe],
    templateUrl: './totales.component.html',
    styles: ``
})
export class TotalesComponent {
  @Input({ required: true }) speciesCount!:Record<string, number>;
  @Input({ required: true }) typeCount!:Record<string, number>;
}
