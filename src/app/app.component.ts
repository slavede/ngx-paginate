import { Component } from '@angular/core';
import { PageState } from './paginate.component';

@Component({
  selector: 'ngx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page: PageState = {
    currentPage : 1,
    pageSize : 3,
    totalItems: 100
  };

  pageChange(pageState: PageState) {
    console.log('Page changed. Reload data with new paging values');
    console.log(pageState);
  }
}
