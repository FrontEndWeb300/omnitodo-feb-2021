import { createEffect, ofType, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // NOTE: Only this one ever. never the.prod or whatever.
import * as authActions from '../actions/auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class AuthEffects {

  readonly baseUri = environment.apiUrl;

  // logInRequested => (posting it to the API) => (loginSucceeded | loginFailed)
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginRequested),
      switchMap(request => this.client.post<{ token: string }>(this.baseUri + 'auth/login', {
        username: request.username,
        password: request.password
      }).pipe(
        map(response => authActions.loginSucceeded({ username: request.username, token: response.token })),
        catchError(() => of(authActions.loginFailed({ reason: 'Sorry Cannot Login' })))
      )
      )
    ), { dispatch: true }
  );

  constructor(
    private actions$: Actions,
    private client: HttpClient
  ) { }
}
