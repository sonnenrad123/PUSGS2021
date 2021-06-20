import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccountService } from '../services/user-account/user-account.service';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login'
import { AuthenticationResponse } from '../models/common/authentication-response';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SocialLoginStepDisplayComponent } from '../security/social-login-step-display/social-login-step-display.component';
import { FbSocialLoginStepDisplayComponent } from '../security/fb-social-login-step-display/fb-social-login-step-display.component';
import { MatTableDataSource } from '@angular/material/table';
import { ReportOutageDialogComponent } from '../report-outage-dialog/report-outage-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  socialProvider = "google";


  constructor(private _snackBar: MatSnackBar, private router: Router, private userService: UserAccountService, public OAuth: SocialAuthService,private dialog: MatDialog) {
    this.loginForm = new FormGroup({
      userEmail:  new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  login(){
    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.userService.saveToken(res as AuthenticationResponse);
        localStorage.setItem('user', this.loginForm.get('userEmail').value);
        this.router.navigateByUrl('/test');
      },
      err => {
        if (err.status == 400)
          this._snackBar.open('Incorrect user email or password!', 'Ok');
        else
          console.log(err);
      }
    );
    
  }

  loginWithGoogle(){
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';
    dialogConfig.minHeight = '350px';
    const dialogRef = this.dialog.open(SocialLoginStepDisplayComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data !== undefined){
          
        this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
          var merged = Object.assign(socialusers, data);
          
          this.userService.googleSocialLogin(merged).subscribe((res: any) =>{
            //console.log(res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', socialusers.email)
            this._snackBar.open('Successfully registered with Google! Please wait to account be allowed by admin!', 'Ok');

            this.router.navigate(['/home']);
          });
          
        });
      }
    }
    );
    
    
  }

  loginWithFacebook(){
    

    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';
    dialogConfig.minHeight = '350px';
    const dialogRef = this.dialog.open(FbSocialLoginStepDisplayComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      (data) => {
          if(data !== undefined){
            this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
              var merged = Object.assign(data, socialusers);
              this.userService.faceboookSocialLogin(merged).subscribe((res: any) =>{
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', socialusers.email);
                this._snackBar.open('Successfully registered with Facebook! Please wait to account be allowed by admin!', 'Ok');

                this.router.navigate(['/home']);
              })
            });
          
          }
      }
    );
    
  }

  reportOutage(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ReportOutageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
      });
  }
    
  getErrorMessageEmail(){
    const field = this.loginForm.get('userEmail');
    
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
