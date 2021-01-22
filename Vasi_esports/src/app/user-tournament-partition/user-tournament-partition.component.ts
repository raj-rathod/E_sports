import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-tournament-partition',
  templateUrl: './user-tournament-partition.component.html',
  styleUrls: ['./user-tournament-partition.component.css']
})
export class UserTournamentPartitionComponent implements OnInit {

  constructor(private user :UserService, private router : Router) { }
  public emailId :any ={"email" : null};
  public soloData :any=[];
  public dualData :any=[];
  public squadData :any=[];
  public myData :any =[];


  ngOnInit(): void {
    this.emailId.email = this.user.getUserEmail();
    if(this.emailId.email == null){
      this.router.navigate(['/userprofile']);
    }else{
       this.user.soloMyMatch(this.emailId.email)
       .subscribe(res => { 
                              if(res.length>0){
                                this.soloData = res;
                                this.myFunc(this.soloData);
                              }
                         },
                     err => console.log(err));
       this.user.dualMyMatch(this.emailId.email)
                 .subscribe(
                             res => {
                                if(res.length>0){
                                 this.dualData = res;
                                 this.myFunc(this.dualData);
                                }
                              }, err => console.log(err));
       this.user.squadMyMatch(this.emailId.email).subscribe(res => {
        if(res.length>0){
          this.squadData = res;
          this.myFunc(this.squadData);
        }
       }, err => console.log(err));
      
    }
    
  }
  
  myFunc(data){
      for(let i of data){
        this.myData.push(i)
      }
  }


  registeredPlayer(event , data){
    switch(data){
      case "Solo" : {
                       this.user.soloParticipant(event)
                       .subscribe(res =>{
                             this.user.setParticipantData(res);
                             this.router.navigate(["/registered"]);       
                         },
                         err =>{console.log(err)})
                       
                       break;
                    }
      case "Dual":{
        this.user.dualParticipant(event)
        .subscribe(res =>{
          this.user.setParticipantData(res);
          this.router.navigate(["/registered"]);       
          },
          err =>{console.log(err)})
         break;
        }
      case "Squad":{
        this.user.squadParticipant(event)
        .subscribe(res =>{
          this.user.setParticipantData(res);
          this.router.navigate(["/registered"]);         
          },
          err =>{console.log(err)})
                    
          break;
        }
    }
  }
}
