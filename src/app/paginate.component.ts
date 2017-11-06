import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

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
  titles: {
    firstPage: string;
    lastPage: string;
    previousPage: string;
    nextPage: string;
  };
}

@Component({
  selector: 'ngx-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class NgxPaginateComponent implements OnInit, DoCheck {
  @Input() options: PaginateOptions = {
    spanPages : 2,
    previousPage: true,
    nextPage: true,
    firstPage: true,
    lastPage: true,
    titles: {
      firstPage: '<<',
      previousPage: '<',
      lastPage: '>>',
      nextPage: '>'
    }
  };

  @Input() page: PageState;
  @Output() pageChange = new EventEmitter<PageState>();


  constructor() {
    this.range = [];
  }

  range: number[];
  ngOnInit() {
    this.range = [];

    this.calculateRange();
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

    // this.pageChange.emit(this.page);
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
}
