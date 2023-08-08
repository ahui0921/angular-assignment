import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthGuard, AuthService],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow activation and return true if user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(true);
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it('should navigate to "reg-form" route and return false if user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(router, 'navigate');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(false);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['reg-form']);
  });
});
