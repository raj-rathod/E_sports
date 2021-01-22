import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import {Router} from '@angular/router';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-user-roomid',
  templateUrl: './user-roomid.component.html',
  styleUrls: ['./user-roomid.component.css']
})
export class UserRoomidComponent implements OnInit {

  public emailId :any ={"email" : null};
  public myData :any =[];

  constructor(private user :UserService, private router :Router) { }

  ngOnInit(): void {
    
    this.emailId.email = this.user.getUserEmail();
    if(this.emailId.email == null){
      this.router.navigate(['/userprofile']);
    }else{
       this.user.soloMyMatch(this.emailId.email)
       .subscribe(res => { 
                              if(res.length>0){
                               
                                this.myFunc(res);
                              }
                         },
                     err => console.log(err));
       this.user.dualMyMatch(this.emailId.email)
                 .subscribe(
                             res => {
                                if(res.length>0){
                                 
                                  this.myFunc(res);
                                }
                              }, err => console.log(err));
       this.user.squadMyMatch(this.emailId.email).subscribe(res => {
        if(res.length>0){
          this.myFunc(res);
        }
       }, err => console.log(err));

       
    }

  }

  myFunc(data){
    for(let i of data){
      this.user.joinTournaments(i.tournamentId).subscribe(
        res => this.myData.push(res),
        err => console.log(err)
      );
    }
  }

}
