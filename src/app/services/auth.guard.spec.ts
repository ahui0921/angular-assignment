import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should activate route if user is authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);
    
    const canActivate = authGuard.canActivate();

    expect(canActivate).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to "reg-form" and return false if user is not authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);

    const canActivate = authGuard.canActivate();

    expect(canActivate).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['reg-form']);
  });
});
