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
}
