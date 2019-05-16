import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserPageComponent } from './search-user-page.component';

describe('SearchUserPageComponent', () => {
  let component: SearchUserPageComponent;
  let fixture: ComponentFixture<SearchUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
