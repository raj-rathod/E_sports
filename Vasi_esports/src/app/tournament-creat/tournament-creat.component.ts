import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { TournamentsService} from '../Services/tournaments.service';


@Component({
  selector: 'app-tournament-creat',
  templateUrl: './tournament-creat.component.html',
  styleUrls: ['./tournament-creat.component.css']
})
export class TournamentCreatComponent implements OnInit {

  constructor(private tournament :TournamentsService) { }

  tournamentData = {
    "tournamentName" :"",
    "tournamentType" : "",
    "tournamentDate" :"",
    "tournamentTime" : "",
    "entryFees":"",
    "prizeMoney":""
  };
 error : boolean = false;
 errorMassage : any;
 matchData :any = [];
  ngOnInit(): void {
    this.tournamentCreated();
  }
  public tournamentFlag :boolean = false;
  newTournament(){
     this.tournamentFlag = true;
  }


  CreateTournament(){
    this.tournamentFlag = false;
  }

  onSubmit(form:NgForm){
   this.tournament.tournamentCreate(form.value)
   .subscribe(
              res => {
                this.tournamentFlag = false;
                this.clearData();
                this.tournamentCreated();
                
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

  clearData(){
    this.tournamentData =null;
  }

tournamentCreated(){
  this.tournament.tournamentCreated()
  .subscribe(
    res => {
      this.matchData = res;
     
    },
    err => console.log(err)
  );
}

deleteMatch(event){
 this.tournament.tournamentDelete(event)
  .subscribe(
    res =>{
      this.tournamentCreated();
    },
    err =>{
      console.log(err);
    }
  )
}

publicMatch(event){
  this.tournament.tournamentPublic(event)
  .subscribe(
    res =>{
      this.tournamentCreated();   
    },
    err =>{
        console.log(err);
    }
  )
}

}
 