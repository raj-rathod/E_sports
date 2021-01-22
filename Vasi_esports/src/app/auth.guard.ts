import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
 
  constructor(private authentication : AuthenticationService,
              private router : Router){}
  canActivate() : boolean {
    if(this.authentication.loggedIn())
    {
      return true;

    }else{
      this.router.navigate(['/registration']);
      return false;
    }
  }
  
}
