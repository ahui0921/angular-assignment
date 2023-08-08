import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegistrationFormComponent {
  public regForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.regForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      bio: new FormControl(''),
    });
  }

  public submit() {
    if (this.regForm.valid) {
      localStorage.setItem('authToken', 'true');
      this.http.get(' https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d', this.regForm.value).subscribe((data) => {
      this.router.navigate(['profile-page']);
      });
    }
  }
  @Output() submitAction = new EventEmitter();
}
