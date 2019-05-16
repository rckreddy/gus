import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchUserPageComponent } from './containers/search-user-page/search-user-page.component';

export const routes: Routes = [
  { path: '', component: SearchUserPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
