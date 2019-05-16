import { PageEvent } from '@angular/material';
import { UserSearch } from './../../models/user-search';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gus-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  @Input() userSearch: UserSearch;
  @Input() searching = false;
  @Input() error = '';
  @Input()
  set totalCount(totalCount: number) {
    this.length = totalCount;
  }
  @Output() search = new EventEmitter<string>();
  @Output() page = new EventEmitter<PageEvent>();

  // MatPaginator Inputs
  length = 0;
  pageSize = 30;

  constructor() { }

  ngOnInit() {
  }

  onPage(pageEvent: PageEvent) {
    this.page.emit(pageEvent);
  }

}
