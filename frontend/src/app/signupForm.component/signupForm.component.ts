import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { Validators } from '../general.classes/Globals';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signupForm.component.html',
  styleUrls: ['./signupForm.component.scss']
})
export class SignupFormComponent implements AfterViewInit {
  @ViewChild('passwordField') passwordField: ElementRef;
  @ViewChild('passwordConfirmField') passwordConfirmField: ElementRef;
  public firstNameValidator = new FormControl('', Validators.nameValidatorList);
  public lastNameValidator = new FormControl('', Validators.nameValidatorList);
  public emailValidator = new FormControl('', Validators.emailValidatorList);
  public passwordValidator = new FormControl('', Validators.passwordValidatorList);
  public passwordConfirmValidator = new FormControl('', Validators.passwordValidatorList);
  secondaryValidate() {
    return this.passwordConfirmField.nativeElement.value === this.passwordField.nativeElement.value;
  }
  validateConfirmPassword(control: FormControl = null): ValidatorFn {
    console.log(control.value);
    // if (this.secondaryValidate) {
    //   console.log("They are the same!");
    // }
    // if (confirmPassword === this.passwordField.nativeElement.value) {
    //   return {
    //             passwordsMatc: true;
    //          };
    // }
    return null;
  }
  public firstNameErrorMessage(): string {
    return 'You must enter a valid first name';
  }
  public lastNameErrorMessage(): string {
    return 'You must enter a valid last name';
  }

  public emailErrorMessage(): string {
    console.log();
    return this.emailValidator.hasError('required') ? 'You must enter a value' :
           this.emailValidator.hasError('email') ? 'Not a valid email' :
            '';
  }
  public passwordErrorMessage(): string {
    return this.passwordValidator.hasError('required') ? 'You must enter a password' :
           this.passwordValidator.hasError('minlength') ? 'Your password must be at least 8 in length' :
           'Your password must have at least a digit and one of [!@#$%^&*]';
  }
  public passwordConfirmErrorMessage(): string {
    return this.passwordConfirmValidator.hasError('required') ? 'You must confirm your password' :
           'The passwords do not match.';
  }
  public ngAfterViewInit() {
  }
  
}
