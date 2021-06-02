import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from '../models/team/team';
import { UserRole } from '../models/user-role/user-role.enum';
import { User } from '../models/user/user';
import { TeamService } from '../services/teams/team.service';
import { UserAccountService } from '../services/user-account/user-account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = "Registration page";
  data = false;
  message: string;
  
  userTeams: Team[] = [];
  userRoles = UserRole;
  form: FormGroup;
  userProfileImage : any;

  constructor(private router: Router, private userAccService: UserAccountService, private teamService: TeamService) 
  {
    this.userProfileImage = "../../assets/img/sidebar-background.png";
    
    this.form = new FormGroup({});
    
  }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe((data: any[]) => {
      this.userTeams = data;
    });

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordconfirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      userEmail:  new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      roleOfUser: new FormControl('', [Validators.required]),
      userTeam: new FormControl('')
    });
   
  }
  
  RegisterMethod(){
    
    const user = this.form.value;
    if(this.form.controls['roleOfUser'].value === 'TEAM_MEMBER'){
      user.userTeam = this.userTeams.find(t => t.teamID == this.form.controls['userTeam'].value); 
    }else{
      user.userTeam = null;
    }
    this.userAccService.register(user);
  }

  onPasswordChange() {
    if (this.passwordconfirmation.value == this.password.value) {
      this.passwordconfirmation.setErrors(null);
    } else {
      this.passwordconfirmation.setErrors({ mismatch: true });
    }
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }
  
  get passwordconfirmation(): AbstractControl {
    return this.form.controls['passwordconfirmation'];
  }

  userRolesKeys(): Array<string>{
    var keys = Object.keys(this.userRoles);
    return keys;
  }
  getErrorMessageUsername(){
    const field = this.form.get('username');
    
    if(field !== null){
      if(field.hasError('required')){
        return 'The username field is required';
      }
    }
    return '';
  }

  getErrorMessageFirstname(){
    const field = this.form.get('firstname');
    
    if(field !== null){
      if(field.hasError('required')){
        return 'The first name field is required';
      }
    }
    return '';
  }

  getErrorMessageLastname(){
    const field = this.form.get('lastname');
  
    if(field !== null){
      if(field.hasError('required')){
        return 'The last name field is required';
      }
    }
    return '';
  }

  getErrorMessageAddress(){
    const field = this.form.get('address');
    
    if(field !== null){
      if(field.hasError('required')){
        return 'The address field is required';
      }
    }
    return '';
  }

  getErrorMessageBirthday(){
    const field = this.form.get('dateOfBirth');
      
    if(field !== null){
      if(field !== null){
        if(field.hasError('required')){
          return 'The birthday field is required';
        }
      }
    }
    return '';
  }

  getErrorMessageUserRole(){
    const field = this.form.get('roleOfUser');
    
    if(field !== null){
      if(field.hasError('required')){
        return 'The user role field is required';
      }
    }
    
    return '';
  }

  getErrorMessageEmail(){
    const field = this.form.get('userEmail');
    
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
    const field = this.form.get('password');
    
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

  getErrorMessagePasswordConfirmation(){
    const field = this.form.get('passwordconfirmation');
    if(field !== null){
      if(field.hasError('required')){
        return 'The password field is required';
      }
      if(field.hasError('minlength')){
        return 'Password must contains at least 8 characters';
      }
      if(field.hasError('mismatch')){
        return 'Passwords do not match';
      }
      
    }
    return '';
  }
}
