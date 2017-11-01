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

@Component({
  selector: 'ngx-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class NgxPaginateComponent implements OnInit, DoCheck {
  @Input() options: {
    spanPages: number, //  number of how many pages additionally will be shown on left and right
    previousButton: boolean,
    nextButton: boolean,
    firstPage: boolean,
    lastPage: boolean,
  } = {
    spanPages : 2,
    previousButton: false,
    nextButton: false,
    firstPage: false,
    lastPage: false
  };

  @Input() page: PageState;
  @Output() pageChange = new EventEmitter<PageState>();

  @Input() noMoreItems: boolean; // when there is no more item, don't show span going over current page

  constructor() {
    this.range = [];
  }

  range: any[];
  ngOnInit() {
    this.range = new Array(this.options.spanPages + 1);

    this.calculateRange();
    this.pageChange.emit(this.page);
    // this.setPage(this.page.currentPage);
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


  ngDoCheck(): void {
    if (this.page) {
      this.calculateRange();
    }
  }
}
