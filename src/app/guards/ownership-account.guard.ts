import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { take, map, tap } from 'rxjs/operators';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class OwnershipAccountGuard implements CanActivate {

  constructor(
    private authService: AuthService
    ,private router: Router
    ,private alertService: AlertService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser.pipe(
      take(1),
      map((currentUser) => !!currentUser && currentUser.id == next.params.userId),
      tap((isOwner) => {
        if(!isOwner) {
          this.alertService.alerts.next(new Alert('You can only edit on your profile',AlertType.Danger));
          this.router.navigate(['/login'],{ queryParams: { returnUrl: state.url }});
        }
      })
    )
  }

}
