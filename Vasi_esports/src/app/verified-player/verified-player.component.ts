import { Component, OnInit } from '@angular/core';
import {AdminService} from '../Services/admin.service';
import {UserService} from '../Services/user.service';

@Component({
  selector: 'app-verified-player',
  templateUrl: './verified-player.component.html',
  styleUrls: ['./verified-player.component.css']
})
export class VerifiedPlayerComponent implements OnInit {

   public matchData :any=[];
   public playerData:any=[{"tournamentName":"A","tournamentType":"B"}];

  constructor(private admin : AdminService, private user:UserService) { }

  ngOnInit(): void {
    
    this.admin.matchPlayed().subscribe(
      res =>{
        this.matchData = res;
      } ,
      err => console.log(err)
    )

  }
  public playerListFlag : boolean = false;
  playerList(event){
    this.playerListFlag = true;
    switch(event.tournamentType){
      case "Solo" :{
        this.user.soloParticipant(event._id)
        .subscribe(
          res => {
            if(res.length>0){
              this.playerData = res;
            }else{
              this.playerData = [{"tournamentName":"Empty","tournamentType":"B"}];
            }
          },
          err => console.log(err)
        );
        break;
      }
      case "Dual" :{
       this.user.dualParticipant(event._id)
       .subscribe(
         res => {
           if(res.length >0){
            this.playerData = res;
           }else{
            this.playerData = [{"tournamentName":"Empty","tournamentType":"B"}];
          }
         },
         err => console.log(err)
       );
        break;
      }
      case "Squad" :{
       this.user.squadParticipant(event._id)
       .subscribe(
         res => {
           if(res.length >0){
            this.playerData = res;
           }else{
            this.playerData = [{"tournamentName":"Empty","tournamentType":"B"}];
          }
         },
         err => console.log(err)
       );
        break;
      }
    }
  }

  match(){
    this.playerListFlag = false;
  }


}
