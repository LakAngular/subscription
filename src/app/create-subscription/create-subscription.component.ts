import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubscriptionFields, SubscriptionValidation } from '../_models/subscription.validation.model';
import { ISubscription } from '../_models/isubscription';
import { ISubscriptionType } from '../_models/subscription-types';
import { SubscriptionService } from '../_services/subscription.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})
export class CreateSubscriptionComponent implements OnInit {

  isFormSubmitted = false;
  public SubscriptionFields = SubscriptionFields;
  public SubscriptionValidation = SubscriptionValidation;
  subscriptionForm: FormGroup;

  // Pattern of the password to check
  private passwordPattern = '^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$';

  // Pattern of the email to check
  private emailPattern =  '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$';

  // @declaration of subscription key:value.
  subscriptionTypes: ISubscriptionType[] = [
    { value: 'basic', name: 'Basic' },
    { value: 'advanced', name: 'Advanced' },
    { value: 'pro', name: 'Pro' }
  ];

  /**
   * Constructor method of  create-subscription component.
   * @param fb create instance for formGroup
   * @param subscriptionService - Need to DI Subscription service.
   * @param router - Needo to DI Router.
   * @param dialog - Need to DI MatDialog for popup feature.
   */

   constructor(private fb: FormBuilder,
              private subscriptionService: SubscriptionService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.buildSubscriptionForm();
  }

  /**
   * @description create our FormGroup to define email, subscription, passwo rd
   * form control with required and pattern validations.
   * @param email string
   * @param subscription string
   * @param password string
   */

  buildSubscriptionForm() {
    this.subscriptionForm = this.fb.group(
      {
        email: ['', [Validators.required]],
        subscription: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
      }
    );

    /**
     * Asynchrous pattern validation with debouceTime method
     * @email string
     */

    this.subscriptionForm.get('subscription').patchValue('advanced');
    const email = this.subscriptionForm.get('email');
    email.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(() => {

        if (Validators.pattern(this.emailPattern)(email)) {
          email.setErrors({asyncval: true});
          }
    });
    this.validationCheck();
    this.subscriptionForm.valueChanges.pipe(debounceTime(1000)).subscribe(
       (changes) => {
        this.isFormSubmitted = false;
        this.validationCheck();
     });

  }

  /**
   * Method of save subscription form
   * Save the input Email, Subscription, Password into subscription service if form is valid
   * and navigated to listsubscription
   * @Param email string
   * @Param subscription  string
   * @param password string
   * @See listsubscription with email, subscription, password
   */

  saveSubscription() {
    this.isFormSubmitted = true;
    if (this.subscriptionForm.valid) {
      this.subscriptionService.saveSubscription(this.subscriptionForm.value);
      console.log('on save if : ' + this.isFormSubmitted);
      this.router.navigate(['/list-subscription']);
    } else {
      this.validationCheck();
    }
}

  /**
   * @description method for log control errors
   *  @param email string
   * @param password string
   */

  validationCheck() {
  const form = this.subscriptionForm;
  for (const field of Object.keys(this.SubscriptionFields)) {
    // clear previous error message (if any)
    this.SubscriptionFields[field] = '';
    const control = form.get(field);
    if (control && (control.touched || control.dirty || !control.valid)) {
      const messages = this.SubscriptionValidation[field];
      for (const key in control.errors) {
          this.SubscriptionFields[field] = messages[key] + ' ';
      }
    }
  }
}

  /**
   * @description Method for reset the from to clear input.Confirmatoin called before reset the form.
   * Initilize subscrition default value as "advanced" after reset the form.
   * @param email string
   * @param subscribtion string
   * @param password string
   * @see subscribtion set as advanced , email and password cleared. *
   */

  onClearConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,  { width: '300px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirmed) {
        this.subscriptionForm.reset();
        this.subscriptionForm.get('subscription').patchValue('advanced');
      }
    });
  }
}
