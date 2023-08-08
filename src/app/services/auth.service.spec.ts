import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { IResponse, IProfile } from '../models/response.model';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return true if user is authenticated', () => {
    localStorage.setItem('authToken', 'dummyToken');
    const isAuthenticated = authService.isAuthenticated();
    expect(isAuthenticated).toBe(true);
  });

  it('should return false if user is not authenticated', () => {
    localStorage.removeItem('authToken');
    const isAuthenticated = authService.isAuthenticated();
    expect(isAuthenticated).toBe(false);
  });

  it('should send a GET request for registration', () => {
    const mockResponse: IResponse = { success: true };

    authService.registerNewUser().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}${authService.REGISTRATION_URL_TAIL}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should send a GET request for profile data', () => {
    const mockProfile: IProfile = {
      img: '',
      name: '',
      email: '',
      bio: ''
    };

    authService.getProfileData().subscribe((profile) => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}${authService.PROFILE_URL_TAIL}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });
});
