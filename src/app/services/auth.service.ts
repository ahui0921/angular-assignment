
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/response.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token){
      return false;
    }
    return true;
  }

  public registerNewUser(): Observable<IResponse> {
    return this.http.get<IResponse>(environment.apiUrl);
  }

}
