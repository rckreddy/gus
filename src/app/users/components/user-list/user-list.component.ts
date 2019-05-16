import { User } from './../../models/user';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, PageEvent } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gus-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  @Input() users: User[];
  @Output() selectUser = new EventEmitter<User>();

  constructor() {
   }

  ngOnInit() {
  }

  onUserSelect(selectedUser: User) {
    this.selectUser.emit(selectedUser);
  }

}
