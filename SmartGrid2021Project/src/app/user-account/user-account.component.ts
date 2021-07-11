import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExecOptionsWithStringEncoding } from 'node:child_process';
import { setFlagsFromString } from 'node:v8';
import { NominatimResponse } from '../models/nominatim-response/nominatim-response.model';
import { Team } from '../models/team/team';
import { UserRole } from '../models/user-role/user-role.enum';
import { User } from '../models/user/user';
import { NominatimService } from '../services/nominatim/nominatim.service';
import { TeamService } from '../services/teams/team.service';
import { UserAccountService } from '../services/user-account/user-account.service';


export interface appUser{
  id:string;
  userName:string;
  firstname:string;
  lastname:string;
  address:string;
  userEmail: string;
  birthday:Date;
  roleOfUser:string;
  teamOfUser:number;
  userImage:string;
  password?:string;
  confirmPassword?:string;
}

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  title = "";
  user :appUser;
  userTeams: Team[] = []
  userImg = "";
  teamname = "";

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[] = [];
  addressInvalid:boolean = false;

  //user created for testing purpouses
  //testUser : User;
  form : FormGroup;
  moment: Date;
  maxDate: Date;
  minDate: Date;

  constructor(private router: Router, private UserAccService: UserAccountService, private teamService:TeamService, private nominatimService: NominatimService, private snack: MatSnackBar) {
    this.form = new FormGroup({id: new FormControl(''),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('xxxxxxxx', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('xxxxxxxx', [Validators.required, Validators.minLength(8)]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      userEmail:  new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      birthday: new FormControl('', [Validators.required]),
      roleOfUser: new FormControl(''),
      teamOfUser: new FormControl(''),
      userImage: new FormControl('')});
    this.moment = new Date();
    this.maxDate = new Date(this.moment.getFullYear() - 18, this.moment.getMonth(), this.moment.getDate())
    this.minDate = new Date(this.moment.getFullYear() - 200, this.moment.getMonth(), this.moment.getDate());
    //this.testUser = new User("Radin1337", "radin1337", "miroslav.radin@outlook.com", "Miroslav", "Radin", new Date(1998,9,12), "K. Aleksandra 123", UserRole.DISPATCHER);
   }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe((data: any[]) => {
      this.userTeams = data;
    });
    this.UserAccService.getUserProfile(localStorage.getItem('user')).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
        this.user.password = "xxxxxxxx";
        this.user.confirmPassword = "xxxxxxxx"
        this.userImg = this.user.userImage;
        if(this.userTeams.find(t=> this.user.teamOfUser == t.teamID) != undefined){
          this.teamname = this.userTeams.find(t=> this.user.teamOfUser == t.teamID).teamName;
        }
        this.form = new FormGroup({
          id: new FormControl(this.user.id),
          userName: new FormControl(this.user.userName, [Validators.required]),
          password: new FormControl(this.user.password, [Validators.required, Validators.minLength(8)]),
          confirmPassword: new FormControl(this.user.confirmPassword, [Validators.required, Validators.minLength(8)]),
          firstname: new FormControl(this.user.firstname, [Validators.required]),
          lastname: new FormControl(this.user.lastname, [Validators.required]),
          address: new FormControl(this.user.address, [Validators.required]),
          userEmail:  new FormControl(this.user.userEmail, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
          birthday: new FormControl(this.user.birthday, [Validators.required]),
          roleOfUser: new FormControl(this.user.roleOfUser),
          teamOfUser: new FormControl(this.teamname),
          userImage: new FormControl(this.user.userImage)
        })
      },
      (err) => {
        console.log(err);
      }
    );

  }

  OnCancel(){
    this.form = new FormGroup({
      id: new FormControl(this.user.id),
      userName: new FormControl(this.user.userName, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(this.user.confirmPassword, [Validators.required, Validators.minLength(8)]),
      firstname: new FormControl(this.user.firstname, [Validators.required]),
      lastname: new FormControl(this.user.lastname, [Validators.required]),
      address: new FormControl(this.user.address, [Validators.required]),
      userEmail:  new FormControl(this.user.userEmail, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      birthday: new FormControl(this.user.birthday, [Validators.required]),
      roleOfUser: new FormControl(this.user.roleOfUser),
      teamOfUser: new FormControl(this.teamname),
      userImage: new FormControl(this.user.userImage)
    })
  }

  SaveAccountChanges(){
    const user = this.form.value;
    if(this.form.controls['roleOfUser'].value === 'TEAM_MEMBER'){
      user.teamOfUser = this.userTeams.find(t => t.teamName == this.form.controls['teamOfUser'].value).teamID; 
    }else{
      user.teamOfUser = null;
    }
    this.user = user;

    this.UserAccService.modifyUser(this.user.id, this.user).subscribe(response =>{
      console.log(response);
      localStorage.removeItem('user');
      this.UserAccService.logout();
      this.snack.open('Your account has been modified, please login again.','Ok');
      this.router.navigate(['/login']);
    },
    error => {
      console.log(error);
    }
  );
    console.log(this.user);
  }

  uploadImage($event:any){
    this.form.controls['userImage'].setValue($event);
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

  get Address(): AbstractControl {
    return this.form.controls['address'];
  }

  userRolesKeys(): Array<string>{
    var keys = Object.keys(UserRole);
    return keys;
  }
  getErrorMessageUsername(){
    const field = this.form.get('userName');
    
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
      if(field.hasError('formatViolation')){
        return 'Incorrect address format! Press ENTER for searching...'
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

  addressLookup(address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }
  getAddress(result: NominatimResponse){
    this.form.controls['address'].setValue(result.displayName);
  }
  onAddressChanged(){
    let address = this.form.controls['address'].value;
    let found = false;
    this.searchResults.forEach(result => {
      if(result.displayName == address){
        found = true;
      }
    });
    if(found == false){
      this.addressInvalid = true;
      this.Address.setErrors({formatViolation: true});
      return;
    }else{
    this.addressInvalid = false;
    this.Address.setErrors(null);
    }
  }

}
