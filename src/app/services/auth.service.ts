import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;
  constructor(
    private router: Router,
  ) {
    this.currentUser = of(null);
  }

  public signUp(firstName: string,lastName: string, email: string, password: string): Observable<boolean> {
    return of(true);
  }

  public login(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  public logout(): void {
    this.router.navigate(['/login']);
  }
}
