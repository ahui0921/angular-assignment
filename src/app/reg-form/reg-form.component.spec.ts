import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationFormComponent } from './reg-form.component';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['registerNewUser']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;

    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    component.regForm = new FormGroup({
      name: new FormControl('Test Name', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('test@example.com', [Validators.required, Validators.email]),
      password: new FormControl('testpassword', [Validators.required, Validators.maxLength(100)]),
      bio: new FormControl('Test bio', [Validators.required, Validators.maxLength(100)]),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and navigate on successful registration', fakeAsync(() => {
    const response = { success: true };
    mockAuthService.registerNewUser.and.returnValue(of(response));

    component.submit();
    tick();

    expect(localStorage.getItem('authToken')).toBe('true');
    expect(mockAuthService.registerNewUser).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['profile-page']);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Registration success');
  }));
});