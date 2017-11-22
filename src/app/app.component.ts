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
    pageSize : 5,
    totalItems: 100
  };

  currentChange;
  pageChange(pageState: PageState) {
    console.log('Page changed. Reload data with new paging values');
    console.log(pageState);
    this.currentChange = undefined;
    setTimeout(() => {
      this.currentChange = pageState;
    }, 125);

  }
}
