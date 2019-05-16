import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers} from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './effects/users.effects';
import { SearchUserPageComponent } from './containers/search-user-page/search-user-page.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [SearchUserPageComponent, UserSearchComponent, UserListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class UsersModule { }
