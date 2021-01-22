import { Component, OnInit } from '@angular/core';
import {TournamentsService} from '../Services/tournaments.service';
import {AdminService} from '../Services/admin.service';
import {UserService} from '../Services/user.service';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import { importType } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tournament-verification',
  templateUrl: './tournament-verification.component.html',
  styleUrls: ['./tournament-verification.component.css']
})
export class TournamentVerificationComponent implements OnInit {

  constructor(private tournament : TournamentsService,private router : Router, private admin :AdminService ,private user:UserService) { }
  tournamentData =[];

  ngOnInit(): void {
    this.tournaments();
    this.pastMatch();
    this.completeMatch();
  }
  
updateData :any ={
  "roomId":"",
  "password":"",
  "registrationstatus":true,
}

  registrationClosed(form :NgForm,data){
  this.updateData.roomId = form.value.roomId;
  this.updateData.password =form.value.password;
  this.updateData.registrationstatus = false;
  this.tournament.updateTournament(data._id,this.updateData)
  .subscribe(
    res => {this.tournaments();},
    err =>console.log(err)
  );
    
  }
 tournaments(){
  this.tournament.tournaments()
  .subscribe(
    res => {
      this.tournamentData = res;
    },
    err => console.log(err)
  );
 }

 pastMatchData:any =[];
 pastMatch(){
   this.admin.matchPlayed()
   .subscribe(
     res =>this.pastMatchData = res,
     err => console.log(err)
   )
 }

 setResultShow(data){
   let status :any ={
     "resultstatus" :true
   }
   this.tournament.updateTournament(data._id,status)
   .subscribe(
     res =>{this.pastMatch()},
     err => console.log(err)
   )
 }

 completedMatchdata :any=[];
 completeMatch(){
   this.admin.clearTournamentData()
   .subscribe(
     res => {this.completedMatchdata =res;
    
    },
     err => console.log(err)
   )
 }
 
 deleteData(data){
  switch(data.tournamentType){
    case "Solo" :{
       this.tournament.tournamentDelete(data._id)
       .subscribe(
         res =>{
             this.user.deletesoloParticipant(data._id)
             .subscribe(
               res => {
                this.admin.deleteresultShow(data._id)
                .subscribe(
                  res => {this.completeMatch();},
                  err => console.log(err)
                )
               },
               err => console.log(err)
             )
         },
         err => console.log(err)
       );
      break;
    }
    case "Dual" :{
      this.tournament.tournamentDelete(data._id)
       .subscribe(
         res =>{
          this.user.deletedualParticipant(data._id)
          .subscribe(
            res => {
             this.admin.deleteresultShow(data._id)
             .subscribe(
               res => {this.completeMatch();},
               err => console.log(err)
             )
            },
            err => console.log(err)
          )
         },
         err => console.log(err)
       );
      break;
    }
    case "Squad" :{
      this.tournament.tournamentDelete(data._id)
      .subscribe(
        res =>{
          this.user.deletesquadParticipant(data._id)
          .subscribe(
            res => {
             this.admin.deleteresultShow(data._id)
             .subscribe(
               res => {this.completeMatch();},
               err => console.log(err)
             )
            },
            err => console.log(err)
          )
        },
        err => console.log(err)
      );
      break;
    }
  }
 }

}
