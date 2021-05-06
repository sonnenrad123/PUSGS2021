import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = 'http://localhost:65390/api/';

  register(formData){
    return this.http.post(this.BaseURI + 'account/Register', formData).subscribe(() => this.router.navigate(["/login"]));
  }

  login(formData){
    return this.http.post(this.BaseURI + 'account/Login', formData);
  }

  googleSocialLogin(formData){
    return this.http.post(this.BaseURI + 'account/GoogleSocialLogin', formData);
  }

  faceboookSocialLogin(formData){
    return this.http.post(this.BaseURI + 'account/FacebookSocialLogin', formData);
  }
}
