import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {IProfile} from "../models/response.model";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  profileData!: IProfile;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.getProfileDetails();
  }

  public getProfileDetails(): void {
    this.authService.getProfileData().subscribe((response: IProfile) => {
      this.profileData = response;
      this.profileData.img = '/assets/images/profile-img.png';
      localStorage.removeItem('authToken');
    })
  }
}
