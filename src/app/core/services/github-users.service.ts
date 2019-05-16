import { UserSearchResult } from './../../users/models/user-search-result';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/models/user';
import { map } from 'rxjs/operators';
import { UserSearch } from 'src/app/users/models/user-search';

@Injectable({
  providedIn: 'root'
})
export class GithubUsersService {

  private API_PATH = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) {}

  searchUsers(userSearch: UserSearch): Observable<UserSearchResult> {
    return this.http
      .get<UserSearchResult>(`${this.API_PATH}`, { params: {
        q: `${userSearch.query}`,
        page: `${userSearch.pageEvent ? userSearch.pageEvent.pageIndex + 1 : 1}`,
        per_page: `${userSearch.pageEvent ? userSearch.pageEvent.pageSize : 30}`
      }});
  }
}
