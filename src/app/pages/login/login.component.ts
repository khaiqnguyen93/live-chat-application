import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy  {

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(
    private formBuilder: FormBuilder
    , private alertService: AlertService
    , private authService: AuthService
    , private router: Router
    , private routeActive: ActivatedRoute
    ) {
    this.createForm();
   }

  ngOnInit() {
    this.returnUrl = this.routeActive.snapshot.queryParams['returnUrl'] || '/chat';
    // Redirect to chat if already logged in
    this.subscriptions.push(
      this.authService.currentUser.subscribe(user => {
        if(!!user) {
          this.router.navigateByUrl('/chat')
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public submit(): void {
    if(!this.loginForm.valid) {
      this.displayFailedLogin();
      return;
    }

    const{email,password} = this.loginForm.value;
    this.subscriptions.push(
      this.authService.login(email, password).subscribe(success => {
        if(success) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.displayFailedLogin();
        }
      })
    );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  private displayFailedLogin(): void {
    const failureMsg = new Alert('Your login information is invalid. Please try again!', AlertType.Danger);
  this.alertService.alerts.next(failureMsg);
  }
}
