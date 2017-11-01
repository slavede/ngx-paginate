# NgxPaginate

Pagination component for your grid (or any other form of data). It's just concerned of remembering current page state.

It calculates how many pages it needs/can display for user to select from based on current page, page size and total items.

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




```
pageChange(pageState: PageState) {
  console.log('Page changed. Reload data with new paging values');
  // do whatever you need here
}
```

