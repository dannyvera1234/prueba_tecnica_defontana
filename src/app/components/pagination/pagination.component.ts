import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input({ required: true }) totalItems!: number;
  @Input({ required: true }) currentPage!: number;
  @Output() pageChange = new EventEmitter<any>();

  public readonly pageSize = signal(10);



  public readonly totalPages = computed(() => {
    return Math.ceil(this.totalItems / this.pageSize());
  });


  onPrev() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  onNext() {
    if (this.currentPage < this.totalPages()) {
      this.changePage(this.currentPage + 1);
    }
  }

  onPageSelect(page: number) {
    if (page !== this.currentPage && page > 0 && page <= this.totalPages()) {
      this.changePage(page);
    }
  }

  private changePage(page: number) {
    this.currentPage = page;
    this.pageChange.emit({ page: this.currentPage });
  }

  get pageNumbers(): number[] {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage;


    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    const pages = [];

    if (start > 1) {
      pages.push(1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  }
}
