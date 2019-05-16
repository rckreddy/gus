import { SearchSuccess, SearchFailure } from './../actions/users-api.actions';
import { UserSearchResult } from './../models/user-search-result';
import { GithubUsersService } from './../../core/services/github-users.service';
import { SearchUserPageActions, SearchUsers, SearchUsersWithPagination } from './../actions/search-user-page.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { debounceTime, switchMap, skip, takeUntil, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { SearchUserPageActionTypes } from '../actions/search-user-page.actions';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '../reducers';
import { UserSearch } from '../models/user-search';


@Injectable()
export class UsersEffects {

  private GITHUB_PATH = 'https://github.com';

  @Effect()
  searchUsersWithPagination$ = this.actions$.pipe(
    ofType(SearchUserPageActionTypes.SearchUsersWithPagination),
    withLatestFrom(this.store.pipe(select(fromUsers.getUserSearch))),
    // tslint:disable-next-line:max-line-length
    map(([action, userSearch]: [SearchUsersWithPagination, UserSearch]) => new SearchUsers({ query: userSearch.query, pageEvent: action.payload}))
  );

  @Effect()
  searchUsers$ = this.actions$.pipe(
    ofType(SearchUserPageActionTypes.SearchUsers),
    debounceTime(300, asyncScheduler),
    switchMap((action: SearchUsers) => {
      if (action.payload.query === '') {
        return empty;
      }

      const nextSearch$ = this.actions$.pipe(
        ofType(SearchUserPageActionTypes.SearchUsers),
        skip(1)
      );

      return this.githubUsersService.searchUsers(action.payload).pipe(
        takeUntil(nextSearch$),
        map((userSearchResult: UserSearchResult) => new SearchSuccess(userSearchResult)),
        catchError(err =>
          of(new SearchFailure(err))
        )
      );
    })
  );

  @Effect({dispatch: false})
  userSelected$ = this.actions$.pipe(
    ofType(SearchUserPageActionTypes.UserSelected),
    tap((action) => window.open(`${this.GITHUB_PATH}/${action.payload.login}`))
  );

  constructor(private actions$: Actions<SearchUserPageActions>,
              private githubUsersService: GithubUsersService,
              private store: Store<fromUsers.State>) {}

}
