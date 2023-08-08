import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePageComponent } from './profile-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { IProfile } from '../models/response.model';
import { of } from 'rxjs';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let authService: AuthService;

  const mockProfileData: IProfile = {
    "img": "tes",
    "name": "King Julien",
    "email": "kingj@email.com",
    "bio": "Hi my name is King Julien and I like to move it move it."
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePageComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: { getProfileData: () => {return of(mockProfileData)} } }],
    });

    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set profile data on initialization', () => {
    spyOn(authService, 'getProfileData').and.returnValue(of(mockProfileData));
    spyOn(localStorage, 'removeItem');

    component.getProfileDetails();

    expect(authService.getProfileData).toHaveBeenCalled();
    expect(component.profileData).toEqual(mockProfileData);
    expect(component.profileData.img).toBe('/assets/images/profile-img.png');
    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
  });
});
