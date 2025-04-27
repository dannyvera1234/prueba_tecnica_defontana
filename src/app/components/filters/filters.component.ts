import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-filters',
    imports: [ReactiveFormsModule, NgClass, NgOptimizedImage],
    templateUrl: './filters.component.html',
    styles: ``
})
export class FiltersComponent {
 @HostListener('document:click', ['$event.target'])
  onClick(btn: any) {
    if (this.open() && !this.ref.nativeElement.contains(btn)) {
      this.open.set(false);
    }
  }

  public readonly open = signal(false);
  @Output() public readonly filtersData = new EventEmitter<any>();

  constructor(
    private readonly ref: ElementRef,
    private readonly fb: FormBuilder,
  ) { }

  public readonly form = this.fb.group({
    name: [''],
    species: [''],
    status: [''],
  });

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    this.open.set(false);
    this.filtersData.emit(this.form.value);
    this.form.reset({
      name: "",
      species: "",
      status: "",
    });

  }


}
