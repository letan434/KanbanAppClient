import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from '@tan2k/shared/models';

export interface AuthState extends User {
  token: string;
}

export function createInitialAuthState(): AuthState {
  return { token: `${new Date().getTime()}` } as AuthState;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'auth'
})
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialAuthState());
  }
}
