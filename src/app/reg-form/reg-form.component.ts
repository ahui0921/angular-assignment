import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegistrationFormComponent {
  public regForm: FormGroup;

  constructor(
    private http: HttpClient,
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
      this.http.get(' https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d', this.regForm.value)
    }
  }
  @Output() submitAction = new EventEmitter();
}
