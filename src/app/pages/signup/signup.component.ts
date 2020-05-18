import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder
    , private alertService: AlertService
    , private authSer: AuthService
    , private router: Router
    ) {
    this.createForm();
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public submit(): void {
    if(!this.signupForm.valid) {
      const failureMsg = new Alert('Your signup information is invalid. Please try again!', AlertType.Danger);
      this.alertService.alerts.next(failureMsg);
      return;
    }
    const{email, password, firstName, lastName} = this.signupForm.value;
    console.log(`Email:${email}, Password: ${password}`, `First Name: ${firstName}`, `Last Name: ${lastName}`);
    this.subscriptions.push(
      this.authSer.signUp(firstName, lastName, email, password).subscribe(success => {
        if(success) {
          this.router.navigate(['/chat']);
        }
      })
    );
  }

  private createForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

}
