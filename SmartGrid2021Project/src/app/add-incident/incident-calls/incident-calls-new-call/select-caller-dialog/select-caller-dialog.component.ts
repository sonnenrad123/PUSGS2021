import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import {User} from '../../../../models/user/user';
import {MatListModule} from '@angular/material/list';
import { UserRole } from 'src/app/models/user-role/user-role.enum';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-select-caller-dialog',
  templateUrl: './select-caller-dialog.component.html',
  styleUrls: ['./select-caller-dialog.component.css']
})
export class SelectCallerDialogComponent implements OnInit {
  SelectedUserEmail:any;
  Customers:any[];
  unfilteredCustomers:any[];
  SelectedUser:any;
  constructor( private dialogRef: MatDialogRef<SelectCallerDialogComponent>,private UserService:UserAccountService) { }
  
  ngOnInit(): void {
    this.readData();
  }



  getCustomer(customer:any){
    console.log(customer.target.parentNode.innerText);
    let strings = customer.target.parentNode.innerText.split([' ']);
    let email = strings[strings.length-1];
    this.SelectedUserEmail = email;
  }



  close() {
    this.dialogRef.close();
  }


  selectUser(){
    this.SelectedUser = this.Customers.find((x) => x.email == this.SelectedUserEmail);
    this.dialogRef.close(this.SelectedUser);
  }

  readData(){
    this.UserService.getAllCustomers().subscribe(
      customers => {
        this.Customers = customers;
        this.unfilteredCustomers = this.Customers;
        console.log(customers);
      },
      error => {
        console.log(error);
      }
    );
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   
    this.Customers = this.unfilteredCustomers.filter((x) => x.firstName.includes(filterValue) || x.lastName.includes(filterValue) || x.email.includes(filterValue));
    if(filterValue.trim().toLowerCase() == ""){
      this.Customers = this.unfilteredCustomers;
    }
  }

  
}
