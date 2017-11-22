import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

export class PageState {
  currentPage: number;
  pageSize: number;
  totalItems?: number;
  numberOfPages?: number;
}

export class PaginateOptions {
  spanPages: number; //  number of how many pages additionally will be shown on left and right
  firstPage: boolean;
  previousPage: boolean;
  nextPage: boolean;
  lastPage: boolean;
  pageSizes?: {
    value: number,
    display: string
  }[];
  titles?: {
    firstPage: string;
    lastPage: string;
    previousPage: string;
    nextPage: string;
    pageSize: string;
  };
}

const defaults: PaginateOptions = {
  spanPages : 2,
  previousPage: true,
  nextPage: true,
  firstPage: true,
  lastPage: true,
  titles: {
    firstPage: 'First',
    previousPage: 'Previous',
    lastPage: 'Last',
    nextPage: 'Next',
    pageSize: 'Items per page'
  },
  pageSizes: [{
    value: 5,
    display: '5'
  }, {
    value: 10,
    display: '10'
  }, {
    value: 15,
    display: '15'
  }]
};

@Component({
  selector: 'ngx-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class NgxPaginateComponent implements OnInit, DoCheck, OnChanges {

  internalOptions: PaginateOptions;
  @Input() options: PaginateOptions;

  @Input() page: PageState;
  @Output() pageChange = new EventEmitter<PageState>();

  constructor() {
    this.range = [];
  }

  range: number[];
  ngOnInit() {
    this.range = [];
    this.setOptions();

    this.calculateRange();
    this.pageChange.emit(this.page);
  }

  setOptions() {
    if (!this.options) {
      this.options = defaults;
    }
    this.internalOptions = {
      spanPages: this.options.spanPages || defaults.spanPages,
      previousPage: this.options.previousPage || defaults.previousPage,
      nextPage: this.options.nextPage || defaults.nextPage,
      firstPage: this.options.firstPage || defaults.firstPage,
      lastPage: this.options.lastPage || defaults.lastPage,
      titles: {
        firstPage: this.options.titles.firstPage || defaults.titles.firstPage,
        previousPage: this.options.titles.previousPage || defaults.titles.previousPage,
        lastPage: this.options.titles.lastPage || defaults.titles.lastPage,
        nextPage: this.options.titles.nextPage || defaults.titles.nextPage,
        pageSize: this.options.titles.pageSize || defaults.titles.pageSize
      },
      pageSizes: this.options.pageSizes || defaults.pageSizes.slice()
    };
  }

  setPageSize(pageSize) {
    this.page.pageSize = parseInt(pageSize, 10);
    this.pageChange.emit(this.page);
  }

  calculateRange() {
    this.range.length = 0;
    this.page.numberOfPages = Math.ceil(this.page.totalItems / this.page.pageSize);
    let upperSpan;

    // if we can add span in front of current page, add it
    if (this.page.currentPage - this.options.spanPages > 0) {
      for (let i = this.page.currentPage - this.options.spanPages; i < this.page.currentPage; i++) {
        this.range.push(i);
      }
      upperSpan = this.options.spanPages;
    } else {
      // if not, add as much as you can after it and adjust upper span
      upperSpan = this.options.spanPages * 2;
      for (let i = 1; i < this.page.currentPage; i++) {
        this.range.push(i);
        upperSpan--;
      }
    }

    this.range.push(this.page.currentPage);

    if (this.page.currentPage + upperSpan <= this.page.numberOfPages) {
      for (let i = this.page.currentPage + 1; i <= this.page.currentPage + upperSpan; i++) {
        this.range.push(i);
      }
    } else {
      for (let i = this.page.currentPage + 1; i <= this.page.numberOfPages; i++) {
        this.range.push(i);
        upperSpan--;
      }

      if (upperSpan > 0 ) {
        // something is still left, prepend it to array (only if bigger than 0)
        while (upperSpan > 0 && this.range[0] - 1 > 0) {
          this.range.unshift(this.range[0] - 1);
          upperSpan--;
        }

      }
    }

  }

  setPage(page: number) {
    if (this.page.currentPage !== page) {
      this.page.currentPage = page;
      this.calculateRange();
      this.pageChange.emit(this.page);
    }
  }

  previousPage() {
    if (this.page.currentPage > 1) {
      this.setPage(this.page.currentPage - 1);
    }
  }

  nextPage() {
    if (this.page.currentPage < this.page.numberOfPages) {
      this.setPage(this.page.currentPage + 1);
    }
  }

  ngDoCheck(): void {
    if (this.page) {
      this.calculateRange();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && changes['options'].currentValue) {
      this.setOptions();
    }
  }
}
