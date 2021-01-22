import { Component, OnInit } from '@angular/core';
import {TournamentsService} from '../Services/tournaments.service';
import {UserService} from '../Services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upcoming-tournament',
  templateUrl: './upcoming-tournament.component.html',
  styleUrls: ['./upcoming-tournament.component.css']
})
export class UpcomingTournamentComponent implements OnInit {

  constructor(private tournament : TournamentsService,private router : Router, private user:UserService) { }
 public tournamentData :any;
  ngOnInit(): void {
    if(this.tournament.tournamentGetData() == null){
      this.router.navigate(['/tournaments']);
    }else{
      this.tournamentData = this.tournament.tournamentGetData();
    }
  }


  registeredPlayer(event){
     switch(event.tournamentType){
       case "Solo":{
        this.user.soloParticipant(event._id)
        .subscribe(res =>{
              this.user.setParticipantData(res);
              this.router.navigate(["/registered"]);       
          },
          err =>{console.log(err)})
         break;
       }
       case "Dual":{
        this.user.dualParticipant(event._id)
        .subscribe(res =>{
          this.user.setParticipantData(res);
          this.router.navigate(["/registered"]);       
          },
          err =>{console.log(err)})
        break;
      }
      case "Squad":{
        this.user.squadParticipant(event._id)
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
