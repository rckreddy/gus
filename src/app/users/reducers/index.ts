import * as fromSearch from './userssearch.reducer';
import * as fromUsers from './users.reducer';
import * as fromRoot from '../../reducers';
import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

export interface UsersState {
    search: fromSearch.State;
    users: fromUsers.State;
  }

export interface State extends fromRoot.State {
    users: UsersState;
  }

export const reducers: ActionReducerMap<UsersState, any> = {
    search: fromSearch.reducer,
    users: fromUsers.reducer
  };

export const getUsersState = createFeatureSelector<State, UsersState>('users');

export const getUserEntitiesState = createSelector(
    getUsersState,
    state => state.users
  );

export const {
    selectIds: getUserIds,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUsers,
  } = fromUsers.adapter.getSelectors(getUserEntitiesState);

export const getTotalCount = createSelector(
    getUserEntitiesState,
    fromUsers.getTotalCount
  );

export const getSearchState = createSelector(
    getUsersState,
    (state: UsersState) => state.search
  );

export const getUserSearch = createSelector(
    getSearchState,
    fromSearch.getUserSearch
  );
export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
  );
export const getSearchError = createSelector(
    getSearchState,
    fromSearch.getError
  );

