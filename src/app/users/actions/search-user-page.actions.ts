import { UserSearch } from './../models/user-search';
import { Action } from '@ngrx/store';
import { PageEvent } from '@angular/material';
import { User } from '../models/user';

export enum SearchUserPageActionTypes {
  SearchUsers = '[SearchUserPage] Search Users',
  SearchUsersWithPagination = '[SearchUserPage] Search Users With Pagination',
  UserSelected = '[SearchUserPage] User Selected'
}

export class SearchUsers implements Action {
  readonly type = SearchUserPageActionTypes.SearchUsers;
  constructor(public payload: UserSearch) {}
}

export class SearchUsersWithPagination implements Action {
  readonly type = SearchUserPageActionTypes.SearchUsersWithPagination;
  constructor(public payload: PageEvent) {}
}

export class UserSelected implements Action {
  readonly type = SearchUserPageActionTypes.UserSelected;
  constructor(public payload: User) {}
}


export type SearchUserPageActions = SearchUsers | SearchUsersWithPagination | UserSelected;
