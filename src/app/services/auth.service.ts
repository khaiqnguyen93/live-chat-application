import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { AlertService } from './alert.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { Alert } from '../classes/alert';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User | null;

  constructor(
    private router: Router
    , private alertService: AlertService
    , private afAuth: AngularFireAuth
    , private afStore: AngularFirestore
  ) {
    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if(user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )

    this.setCurrentUserSnapshot();
  }

  public signUp(firstName: string,lastName: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${userCredential.user.uid}`);
        const updatedUser = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          firstName,
          lastName,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/live-chat-app-e3108.appspot.com/o/default_avatar.png?alt=media&token=a4086700-9cb6-4d3d-a36e-5a1b8ec2df35',
          status: '',
          about: ''
        }
        userRef.set(updatedUser);
        return true;
      })
      .catch((err) => false)
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
    );
  }

  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out.'));
    });
  }

  private setCurrentUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currentUserSnapshot = user);
  }
}
