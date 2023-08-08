import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProfile, IResponse} from "../models/response.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly REGISTRATION_URL_TAIL = '/7f434df6-a4ac-4817-ab7c-dd39a564d01d'
  readonly PROFILE_URL_TAIL = '/611a3036-4420-48a5-b8da-9b461853cdd2'

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token){
      return false;
    }
    return true;
  }

  public registerNewUser(): Observable<IResponse> {
    return this.http.get<IResponse>(`${environment.baseUrl}${this.REGISTRATION_URL_TAIL}`);
  }

  public getProfileData(): Observable<IProfile> {
    return this.http.get<IProfile>(`${environment.baseUrl}${this.PROFILE_URL_TAIL}`);
  }

}
