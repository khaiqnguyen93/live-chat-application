import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  public submit(): void {
    const{email, password, firstName, lastName} = this.signupForm.value;
    console.log(`Email:${email}, Password: ${password}`, `First Name: ${firstName}`, `Last Name: ${lastName}`);
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
