import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.loginForm = new FormGroup({
      email:  new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  login(){
    this.router.navigate(['/test']);
  }

  loginWithGoogle(){
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  loginWithFacebook(){
    this.afAuth.signInWithRedirect(new firebase.default.auth.FacebookAuthProvider());
  }
  getErrorMessageEmail(){
    const field = this.loginForm.get('email');
    
    if(field !== null){
      if(field.hasError('required')){
        return 'The email field is required';
      }
  
      if(field.hasError('pattern')){
        return 'The email is in incorrect format';
      }
    } 
    return '';
  }
  
  getErrorMessagePassword(){
    const field = this.loginForm.get('password');
    
    if(field !== null){
    if(field.hasError('required')){
      return 'The password field is required';
    }
    if(field.hasError('minlength')){
      return 'Password must contains at least 8 characters';
    }
    }
    return '';
  }
}
