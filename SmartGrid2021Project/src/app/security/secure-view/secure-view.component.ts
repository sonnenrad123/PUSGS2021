import { Component, Input, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

@Component({
  selector: 'app-secure-view',
  templateUrl: './secure-view.component.html',
  styleUrls: ['./secure-view.component.css']
})
export class SecureViewComponent implements OnInit {

  constructor(private securityService:UserAccountService) { }

  ngOnInit(): void {
  }

    @Input()
    role: string;

  isAuthorized(){
    if(this.role){
      return this.securityService.getRole() === this.role;
    }
    else{
      return this.securityService.isAuthenticated();
    }
  }
}
