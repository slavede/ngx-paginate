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
    totalItems: 55
  };
  textToShow: string;

  currentChange;
  pageChange(pageState: PageState, isPageSizeChange = false) {
    this.textToShow = `Page changed. Reload data with new paging values, isPageSizeChange: ${isPageSizeChange}`;
    console.log(pageState);
    this.currentChange = undefined;
    setTimeout(() => {
      this.currentChange = pageState;
    }, 125);

  }
}
