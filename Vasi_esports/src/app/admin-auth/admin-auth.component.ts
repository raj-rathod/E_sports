import { Component, OnInit } from '@angular/core';
import {AdminService} from '../Services/admin.service';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {

  constructor(private router:Router,private admin:AdminService) { }

  ngOnInit(): void {
  }
adminInfo:any={
  "email":"",
  "password":""
}
error :boolean =false;
hide :boolean;
errorMassage :any;
onSubmit(form:NgForm){
  this.admin.AuthAdmin(form.value)
  .subscribe(
    res =>{ 
      
      localStorage.setItem('_aAuthToken',res.token);
      this.error =false;
      this.router.navigate(['/admin']);
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
