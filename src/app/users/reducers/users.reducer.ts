import { UsersApiActions, SearchSuccess, UsersApiActionTypes } from './../actions/users-api.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../models/user';
import { SearchUserPageActions } from '../actions';
import { SearchUserPageActionTypes } from '../actions/search-user-page.actions';

export interface State extends EntityState<User> {
    totalCount: number;
  }

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: false,
  });

export const initialState: State = adapter.getInitialState({
    totalCount: 0
  });

export function reducer(
    state = initialState,
    action:
      | UsersApiActions | SearchUserPageActions
  ): State {
    switch (action.type) {
      case UsersApiActionTypes.SearchSuccess: {
        /**
         * The addMany function provided by the created adapter
         * adds many records to the entity dictionary
         * and returns a new state including those records. If
         * the collection is to be sorted, the adapter will
         * sort each record upon entry into the sorted array.
         */
        const currentState = {
            ...state,
            totalCount: action.payload.total_count
        };
        return adapter.addAll(action.payload.items, currentState);
      }
      case SearchUserPageActionTypes.SearchUsers:
      {
        if (action.payload.query === '') {
            const currentState = {
              ...state,
              totalCount: 0
          };
            return adapter.addAll([], currentState);
        }
        return state;
      }
      default: {
        return state;
      }
    }
  }

export const getTotalCount = (state: State) => state.totalCount;
