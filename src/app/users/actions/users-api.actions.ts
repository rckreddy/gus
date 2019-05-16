import { UserSearchResult } from './../models/user-search-result';
import { Action } from '@ngrx/store';
import { User } from '../models/user';

export enum UsersApiActionTypes {
  SearchSuccess = '[Users] Search Success',
  SearchFailure = '[Users] Search Failure'
}

export class SearchSuccess implements Action {
  readonly type = UsersApiActionTypes.SearchSuccess;
  constructor(public payload: UserSearchResult) {}
}

export class SearchFailure implements Action {
  readonly type = UsersApiActionTypes.SearchFailure;
  constructor(public payload: string) {}
}

export type UsersApiActions = SearchSuccess | SearchFailure;
