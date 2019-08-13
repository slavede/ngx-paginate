[![Build Status](https://travis-ci.org/slavede/ngx-paginate.svg?branch=master)](https://travis-ci.org/slavede/ngx-paginate)

# NgxPaginate

Angular pagination component for your grid (or any other form of data). It's just concerned of remembering current page state.

It calculates how many pages it needs/can display for user to select from based on current page, page size and total items.

![demo1](https://user-images.githubusercontent.com/2838038/33149056-7e92abd4-cfce-11e7-9c2e-313c122bc612.gif)

## Usage

```bash
npm install ngx-paginate --save
```

Import module

```ts
import { NgxPaginateModule } from 'ngx-paginate';

@NgModule({
  imports: [
    NgxPaginateModule
  ]
})
```

Use in your component:

```html
<ngx-paginate
  [page]="page"
  [options]="options"
  (pageChange)='setPage($event)'
  (pageSizeChange)='setPage($event)'>
</ngx-paginate>
```
Where page is of type PageState (comes with component as well):

```ts
export class PageState {
  currentPage: number;
  pageSize: number;
  totalItems?: number;
  numberOfPages?: number;
}
```


Options are type of PaginateOptions (comes with component as well):

```ts
export class PaginateOptions {
  // number of how many pages additionally will be shown on left and right
  spanPages: number;
  // show or hide button for first page (default is true)
  firstPage: boolean;
  // show or hide button for previous page (default is true)
  previousPage: boolean;
  // show or hide button for next page (default is true)
  nextPage: boolean;
  // show or hide button for last page (default is true)
  lastPage: boolean;
  // string that will be shown in appropriate boxes (defaults to <<, >>, < and >)
  titles: {
    firstPage: string;
    lastPage: string;
    previousPage: string;
    nextPage: string;
  };
  // which values to allow to change page for
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
}
```

Default options are:
```TS
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
```

And pageChange is triggered each time page is changed via component:

```ts
pageChange(pageState: PageState) {
  console.log('Page changed. Reload data with new paging values');
  // do whatever you need here
}
```

## Customize colors

To modify how each page entry would look like you need to provide some css overrides in your component (::ng-deep)

`.page-entry` - each page number entry

and

`.page-entry.active` - active page entry

For example

```scss
ngx-paginate ::ng-deep .page-entry {
  background-color: black;
  color: yellow;
}
ngx-paginate ::ng-deep .page-entry.active {
  background-color: blue;
  color: red;
}
```

# Changelog

# Changelog

## [2.0.1] - 2019-08-13

**BREAKING CHANGES:**

* not triggering pageChange on init (kind of bugfix)

## [2.0.0] - 2019-08-13

**BREAKING CHANGES:**
* (pageChange) not emitted when changing page size. New event emitter added called pageSizeChange


## [1.1.0] - 2019-04-04

Improved build system.

**BREAKING CHANGES:**

Importing should be done differently. Instead of using:

```TS
import { NgxPaginateModule } from 'ngx-paginate/ngx-paginate';
```
use
```TS
import { NgxPaginateModule } from 'ngx-paginate';
```

