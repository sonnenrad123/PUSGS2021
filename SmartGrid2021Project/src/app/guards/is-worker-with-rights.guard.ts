import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAccountService } from '../services/user-account/user-account.service';

@Injectable({
  providedIn: 'root'
})
export class IsWorkerWithRightsGuard implements CanActivate {
  constructor(private securityService: UserAccountService, private router:Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.securityService.getRole() === 'WORKER'){
      return true;
    }
    
    this.router.navigate(['/home']);
    return false;
  }
  
}
