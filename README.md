# NgxPaginate

Pagination component for your grid (or any other form of data). It's just concerned of remembering current page state.

It calculates how many pages it needs/can display for user to select from based on current page, page size and total items.

![demo1](https://user-images.githubusercontent.com/2838038/32465146-c16ce3c2-c342-11e7-855a-a95ab0c4f337.gif)

## Usage

```
npm install ngx-paginate --save
```

Import module
```
import { NgxPaginateModule } from 'ngx-paginate/src/app/ngx-paginate.module';

@NgModule({
  imports: [
    NgxPaginateModule
    . . .
```

Use in your component:

```
<ngx-paginate
  [page]="page"
  [options]="options"
  (pageChange)='setPage($event)'>
</ngx-paginate>
```
Where page is of type PageState (comes with component as well):

```
export class PageState {
  currentPage: number;
  pageSize: number;
  totalItems?: number;
  numberOfPages?: number;
}
```

And pageChange is triggered each time page is changed via component:


Options are type of PaginatieOptions (comes with component as well):

```
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
}
```

```
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
```
ngx-paginate ::ng-deep .page-entry {
  background-color: black;
  color: yellow;
}
ngx-paginate ::ng-deep .page-entry.active {
  background-color: blue;
  color: red;
}
```
