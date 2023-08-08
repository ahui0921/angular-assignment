import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { IResponse } from '../models/response.model';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('return "true" if authToken exists', () => {
    localStorage.setItem('authToken', 'true');

    const isAuthenticated = authService.isAuthenticated();

    expect(isAuthenticated).toBe(true);
  });

  it('return "false" if authToken does not exist', () => {
    localStorage.removeItem('authToken');

    const isAuthenticated = authService.isAuthenticated();

    expect(isAuthenticated).toBe(false);
  });

  it('make an HTTP GET request to register a new user', () => {
    const mockResponse: IResponse = { success: true };

    authService.registerNewUser().subscribe((res: IResponse) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
export { AuthService };

