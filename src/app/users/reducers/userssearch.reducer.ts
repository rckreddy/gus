import { UserSearch } from './../models/user-search';

import { SearchUserPageActions, SearchUserPageActionTypes } from '../actions/search-user-page.actions';
import { UsersApiActions, UsersApiActionTypes } from '../actions/users-api.actions';

export interface State {
  loading: boolean;
  error: string;
  userSearch: UserSearch;
}

export const initialState: State = {
  loading: false,
  error: '',
  userSearch: { query: '', pageEvent: null}
};

export function reducer(state = initialState, action: | UsersApiActions | SearchUserPageActions): State {
  switch (action.type) {

    case SearchUserPageActionTypes.SearchUsers:
    {
      const userSearch = action.payload;

      if (userSearch.query === '') {
        return {
          loading: false,
          error: '',
          userSearch: null,
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        userSearch,
      };
    }

    case UsersApiActionTypes.SearchSuccess:
    {
      return {
        loading: false,
        error: '',
        userSearch: state.userSearch,
      };
    }

    case UsersApiActionTypes.SearchFailure:
    {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}

export const getUserSearch = (state: State) => state.userSearch;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
