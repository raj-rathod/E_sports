import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../authentication.service';
import { NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import { SocialAuthService} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  user: SocialUser;
  userData : any = {
     "name" : "",
     "email" : "",
     "photoUrl": "",
     "password" : "",
  };

  error : boolean = false;
  errorMassage : any;
  


  constructor(private authService: SocialAuthService,
     private authentication : AuthenticationService,
     private router:Router) { }
  
  ngOnInit() {
  
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x =>this.socialLogin());
    
  
    
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( x =>this.socialLogin());
    
  }

  signOut(): void {
    this.authService.signOut();
  }

  public signupFlag : boolean = false;
  
  signUpForm(){
    this.signupFlag = true;
  }

  signInForm(){
    this.signupFlag = false;
  }


  userInfo= {
    "email": "",
    "password" : ""
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public loginShowBtn : boolean =true;
  public hide : boolean = true;

  onSubmitRegistration(form :NgForm){
   this.authentication.registerUser(form.value)
    .subscribe( 
      res =>{

        localStorage.setItem('_vAuthToken',res.token);
        localStorage.setItem('tokenId',res.id);
        this.error =false;
        this.router.navigate(['/home']);
      },
      err => {
        if(err.status == 401){
          this.error =true;
          this.errorMassage = err.error[0];
          
        }else{
          this.error =true;
          this.errorMassage ="Something went wrong try again later";
        }
      }
      );
  }

 onSubmit(form : NgForm){
  
  this.authentication.loginUser(form.value)
  .subscribe(
    res =>{ 
      
      localStorage.setItem('_vAuthToken',res.token);
      localStorage.setItem('tokenId',res.id);
      this.error =false;
      this.router.navigate(['/home']);
    },
    err => {
      if(err.status ==401){
        this.error =true;
        this.errorMassage = err.error[0];
        
      }else{
        this.error =true;
        this.errorMassage ="Something went wrong try again later";
      }
    }
  );

 }
 flag : boolean = false;
 socialLogin(){
  this.authService.authState.subscribe((user) => {
    this.user = user;
    this.userData.name = this.user.name;
    this.userData.email= this.user.email;
    this.userData.photoUrl= this.user.photoUrl;
    this.userData.password = this.user.firstName.concat("@2020");
  });
  this.authentication.socoalLogin(this.userData)
   .subscribe(
     res => {
       if(res){
        localStorage.setItem('_vAuthToken',res.token);
        localStorage.setItem('tokenId',res.id);
        this.error =false;
        this.router.navigate(['/home']);
       }else{
        this.authentication.registerUser(this.userData)
        .subscribe(
          res => {
            localStorage.setItem('_vAuthToken',res.token);
            localStorage.setItem('tokenId',res.id);
            this.error =false;
            this.router.navigate(['/home']);
          },
          err =>{
            if(err.status ==401){
              this.error =true;
              this.errorMassage = err.error[0];
              
            }else{
              this.error =true;
              this.errorMassage ="Something went wrong try again later";
            }
          }
        );
       }
     },
     err => {
      if(err.status ==401){
        this.error =true;
        this.errorMassage = err.error[0];
        
      }else{
        this.error =true;
        this.errorMassage ="Something went wrong try again later";
      }
     }
   );
  
  
}


}
