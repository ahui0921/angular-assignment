import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationFormComponent } from './reg-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IResponse } from '../models/response.model';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let authService: AuthService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule],
      providers: [
        { provide: AuthService, useValue: { registerNewUser: () => {return of({success: true})} } },
        { provide: MatSnackBar, useValue: { open: () => {} } },
      ],
    });

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and handle successful registration', () => {
    const mockResponse: IResponse = { success: true };

    spyOn(authService, 'registerNewUser').and.returnValue(of(mockResponse));
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));

    component.regForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      bio: 'Hello, I am John.',
    });

    component.submit();

    expect(authService.registerNewUser).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['profile-page']);
  });

  it('should submit form and handle failed registration', () => {
    const mockResponse: IResponse = { success: false };
    spyOn(authService, 'registerNewUser').and.returnValue(of(mockResponse));
    component.regForm.setValue({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
      bio: 'Hello, I am Jane.',
    });
    component.submit();
    expect(authService.registerNewUser).toHaveBeenCalled();
  });
});
