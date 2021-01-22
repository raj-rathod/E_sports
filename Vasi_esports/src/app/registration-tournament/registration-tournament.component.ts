import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user.service';
@Component({
  selector: 'app-registration-tournament',
  templateUrl: './registration-tournament.component.html',
  styleUrls: ['./registration-tournament.component.css']
})
export class RegistrationTournamentComponent implements OnInit {

  showData :any;

  playerData ={"_id":"","name": "", "email" : "", "photoUrl":"","password":"","rank":0,"score":0,"matches":0,"walletAmount":0,"coins":0,"Date" : Date};


  constructor(private user :UserService){}


  ngOnInit(){
     this.user.topUser()
      .subscribe(
        res => {
          this.playerData =res;
        },
        err => console.log(err)
      )
   }


}
