import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoListItem } from 'src/app/models';
import { AppState, selectInboxItems } from 'src/app/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  inboxItems$: Observable<TodoListItem[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.inboxItems$ = this.store.select(selectInboxItems);
  }

}
