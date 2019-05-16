import { UserSearch } from './../../models/user-search';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import * as fromUsers from '../../reducers';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { SearchUsers, UserSelected, SearchUsersWithPagination } from '../../actions/search-user-page.actions';
import { PageEvent } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gus-search-user-page',
  templateUrl: './search-user-page.component.html',
  styleUrls: ['./search-user-page.component.scss']
})
export class SearchUserPageComponent implements OnInit {
  userSearch$: Observable<UserSearch>;
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  totalCount$: Observable<number>;

  constructor(private store: Store<fromUsers.State>) {
    this.userSearch$ = store.pipe(
      select(fromUsers.getUserSearch),
      take(1)
    );
    this.users$ = store.pipe(select(fromUsers.getAllUsers));
    this.loading$ = store.pipe(select(fromUsers.getSearchLoading));
    this.error$ = store.pipe(select(fromUsers.getSearchError));
    this.totalCount$ = store.pipe(select(fromUsers.getTotalCount));
  }

  onSearch(query: string) {
    this.store.dispatch(new SearchUsers({ query, pageEvent: null}));
  }

  onPage(pageEvent: PageEvent) {
    this.store.dispatch(new SearchUsersWithPagination(pageEvent));
  }

  onUserSelect(selectedUser: User) {
    this.store.dispatch(new UserSelected(selectedUser));
  }

  ngOnInit() {
  }

}
