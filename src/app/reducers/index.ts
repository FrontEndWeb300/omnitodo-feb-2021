
import { ActionReducerMap } from '@ngrx/store';
import * as fromTodos from './todos.reducer';

export interface AppState {
  todos: fromTodos.TodosState;
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodos.reducer
};
