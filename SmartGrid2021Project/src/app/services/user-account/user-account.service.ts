import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/models/common/authentication-response';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http:HttpClient, private router: Router) { }
  readonly BaseURI = environment.apiUrl;
  private  readonly tokenKey: string = 'token';
  private readonly expirationTokenKey: string = 'token-expiration';
  private readonly roleField = "roleOfUser";

  register(formData){
    return this.http.post(this.BaseURI + 'account/Register', formData);
  }

  getRole():string{
    return this.getFieldFromJWT(this.roleField);
  }
  isAuthenticated():boolean{
    const token = localStorage.getItem(this.tokenKey);

    if(!token){
      return false;
    }

    const expiration = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(expiration);

    if(expirationDate <= new Date()){
      this.logout();
      return false;
    }

    return true;
  }
  getToken(){
    return localStorage.getItem(this.tokenKey);
  }
  saveToken(authenticationResponse: AuthenticationResponse){
      localStorage.setItem(this.tokenKey, authenticationResponse.token);
      localStorage.setItem(this.expirationTokenKey, authenticationResponse.expiration.toString());
  }
  login(formData){
    return this.http.post(this.BaseURI + 'account/Login', formData);
  }
  
  getFieldFromJWT(field: string):string{
    const token = localStorage.getItem(this.tokenKey);
    if(!token){return '';}

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  logout(){
    localStorage.removeItem(this.expirationTokenKey);
    localStorage.removeItem(this.tokenKey);
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
