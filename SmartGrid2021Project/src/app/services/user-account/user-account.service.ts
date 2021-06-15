import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = environment.apiUrl;

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

  getAllUsers(){
    return this.http.get<User[]>(environment.apiUrl+ 'account/GetAllUsers');
  }
  getAllCustomers(){
    return this.http.get<User[]>(environment.apiUrl+ 'account/GetAllCustomers');
  }
  deleteUser(username){
    return this.http.delete(environment.apiUrl+ 'account/DeleteUser?username='+username)
  }

  allowLogin(username){
    return this.http.get(this.BaseURI + 'account/AllowLogin?username='+username);
  }
  blockLogin(username){
    return this.http.get(this.BaseURI + 'account/BlockLogin?username='+username);
  }
}
