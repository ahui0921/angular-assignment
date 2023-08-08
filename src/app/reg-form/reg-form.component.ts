import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IResponse} from "../models/response.model";

@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegistrationFormComponent {
  public regForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.regForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.nullValidator, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.nullValidator, Validators.maxLength(100)]),
      bio: new FormControl('', [Validators.required, Validators.nullValidator, Validators.maxLength(100)]),
    });
  }

  public submit() {
    if (this.regForm.valid) {
      localStorage.setItem('authToken', 'true');
      this.authService.registerNewUser().subscribe((result: IResponse) => {
        if (result.success) {
          this.router.navigate(['profile-page']);
          this._snackBar.open('Registration success');
        } else {
          this._snackBar.open('Failed registration');
        }
      });
    }
  }
  @Output() submitAction = new EventEmitter();
}
