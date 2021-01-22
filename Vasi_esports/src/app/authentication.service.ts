import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthenticationService {



  private registerUrl = "http://localhost:3000/api/register";
  private loginUrl = "http://localhost:3000/api/login";
  private socialUrl ="http://localhost:3000/api/sociallog";
  constructor(private http : HttpClient) { }

  registerUser(user){

    return this.http.post<any>(this.registerUrl,user);

  }
 
  
  loginUser(user){

    return this.http.post<any>(this.loginUrl,user);
    
  }

  socoalLogin(user){
    return this.http.post<any>(this.socialUrl,user);
  }
  
  
  loggedIn(){
    return !!localStorage.getItem('_vAuthToken');
  }

  getToken(){
    return localStorage.getItem('_vAuthToken');
  }

}
