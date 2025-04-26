import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-api-rest-filtrs',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgOptimizedImage],
  templateUrl: './api-rest-filtrs.component.html',
  styles: ``
})
export class ApiRestFiltrsComponent {
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
