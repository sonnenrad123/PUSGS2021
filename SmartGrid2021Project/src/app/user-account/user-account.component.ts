import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '../models/user-role/user-role.enum';
import { User } from '../models/user/user';
import { UserAccountService } from '../services/user-account/user-account.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  title = "User account"
  
  //user created for testing purpouses
  testUser : User;
  form : FormGroup;
  moment: Date;
  maxDate: Date;
  minDate: Date;

  constructor(private router: Router, private UserAccService: UserAccountService) {
    this.form = new FormGroup({});
    this.moment = new Date();
    this.maxDate = new Date(this.moment.getFullYear() - 18, this.moment.getMonth(), this.moment.getDate())
    this.minDate = new Date(this.moment.getFullYear() - 200, this.moment.getMonth(), this.moment.getDate());
    this.testUser = new User("Radin1337", "radin1337", "miroslav.radin@outlook.com", "Miroslav", "Radin", new Date(1998,9,12), "K. Aleksandra 123", UserRole.DISPATCHER);

   }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(this.testUser.username, [Validators.required]),
      password: new FormControl(this.testUser.password, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(this.testUser.password, [Validators.required, Validators.minLength(8)]),
      firstname: new FormControl(this.testUser.firstname, [Validators.required]),
      lastname: new FormControl(this.testUser.lastname, [Validators.required]),
      address: new FormControl(this.testUser.address, [Validators.required]),
      userEmail:  new FormControl(this.testUser.userEmail, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      birthday: new FormControl(this.testUser.birthday, [Validators.required]),
      roleOfUser: new FormControl(this.testUser.roleOfUser.toString(), [Validators.required]),
      teamOfUser: new FormControl(this.testUser.userTeam),
      userImage: new FormControl(this.testUser.userImage)
    })
  }

  SaveAccountChanges(){
    const user = this.form.value;
    //testing 
    this.testUser = user;
    print();
  }


  onPasswordChange() {
    if (this.confirmPassword.value == this.password.value) {
      this.confirmPassword.setErrors(null);
    } else {
      this.confirmPassword.setErrors({ mismatch: true });
    }
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }
  
  get confirmPassword(): AbstractControl {
    return this.form.controls['confirmPassword'];
  }

  userRolesKeys(): Array<string>{
    var keys = Object.keys(UserRole);
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
    const field = this.form.get('birthday');
      
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
    const field = this.form.get('confirmPassword');
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
