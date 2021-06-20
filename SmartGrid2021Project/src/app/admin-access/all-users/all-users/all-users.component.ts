import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { User } from 'src/app/models/user/user';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  
  allUsers: any;
  constructor(private userService: UserAccountService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.allUsers = data;
        this.allUsers = this.allUsers.filter(user => user.email !== localStorage.getItem('user'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  DeleteUser(username:string){
    this.userService.deleteUser(username).subscribe(
      (data) =>{
        console.log(data);
        this.userService.getAllUsers().subscribe(
          (data) => {
            console.log(data);
            this.allUsers = data;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  AllowLogin(username:string){
    this.userService.allowLogin(username).subscribe(
      (data) =>{
        console.log(data);
        this.userService.getAllUsers().subscribe(
          (data) => {
            console.log(data);
            this.allUsers = data;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  BlockLogin(username:string){
    this.userService.blockLogin(username).subscribe(
      (data) =>{
        console.log(data);
        this.userService.getAllUsers().subscribe(
          (data) => {
            console.log(data);
            this.allUsers = data;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }
}
