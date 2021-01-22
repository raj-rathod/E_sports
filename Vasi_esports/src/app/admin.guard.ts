import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {AdminService} from './Services/admin.service';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router:Router,private admin:AdminService){}

  canActivate() : boolean {
    if(this.admin.AdminloggedIn())
    {
      return true;

    }else{
      this.router.navigate(['/adminauth']);
      return false;
    }
  }
  
}
