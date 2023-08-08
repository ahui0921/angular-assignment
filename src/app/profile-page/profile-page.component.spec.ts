import { ProfilePageComponent } from './profile-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProfilePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('display profile data', () => {
    const mockResponse = {
      "name": "King Julien",
      "email": "kingj@email.com",
      "bio": "Hi my name is King Julien and I like to move it move it."
    };

    component.getProfileDetails();

    const req = httpMock.expectOne('https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    // Check if profileData is modified as expected
    expect(component.profileData).toEqual({
      // ... expected profile data after modification ...
    });
  });

  it('remove authToken from localStorage test', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem');

    const mockResponse = {"name":"King Julien","email":"kingj@email.com","bio":"Hi my name is King Julien and I like to move it move it.","img":"https://tinyurl.com/2p9953zy"};

    component.getProfileDetails();

    const req = httpMock.expectOne('https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    // Check if localStorage.removeItem is called with the correct argument
    expect(removeItemSpy).toHaveBeenCalledWith('authToken');
  });
});
