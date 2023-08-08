import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  profileData: any;
  constructor(
    private http: HttpClient) {
    this.profileData = this.getProfileDetails();
  }

  public getProfileDetails() {
    this.http.get<any>('https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2').subscribe(res => {
      console.log(res);
      this.profileData = res;
      this.profileData.img = '/assets/images/profile-img.png';
      localStorage.removeItem('authToken');
    });
  }
}
