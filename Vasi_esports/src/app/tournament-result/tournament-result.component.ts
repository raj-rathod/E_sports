import { Component, OnInit } from '@angular/core';
import {AdminService} from '../Services/admin.service';
import {UserService} from '../Services/user.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-tournament-result',
  templateUrl: './tournament-result.component.html',
  styleUrls: ['./tournament-result.component.css']
})
export class TournamentResultComponent implements OnInit {

  public matchData :any=[];
   public playerData:any=[{"tournamentName":"A","tournamentType":"B"," entryFees":0}];

  constructor(private admin : AdminService, private user:UserService) { }

  ngOnInit(): void {
    
    this.admin.matchPlayed().subscribe(
      res =>{
        this.matchData = res;
      } ,
      err => console.log(err)
    )

  }
  
  public resultFlag : boolean = false;

  tournamentSelect(event){
    this.resultFlag = true;
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
    this.resultFlag = false;
  }
resultData :any ={
  "tournamentId":"",
  "name" : "",
  "email":"",
  "prize":0,
  "kill" :0,
  "rank":0,
  "status":""
};
updateData :any ={
  "score" : 0,
  "matches":0,
  "walletAmount":0,
  "coins" :0
}
userData :any={};
onSubmit(form:NgForm,data:any){
  this.resultData.tournamentId = data.tournamentId;
  this.resultData.name = data.pubgName;
  this.resultData.email = data.emailId;
  this.resultData.status = true;
  this.resultData.rank = form.value.rank;
  this.resultData.kill = form.value.kill;
  this.resultData.prize = form.value.prize;
  this.admin.userVerification(this.resultData.email)
  .subscribe(
    res =>{
      if(res){
        this.userData = res;
        this.updateData.score = this.userData.score + this.resultData.kill;
        this.updateData.matches = this.userData.matches+1;
        if(this.playerData[0].entryFees == 0){
        
          this.updateData.coins = this.userData.coins + this.resultData.prize;
          this.updateData.walletAmount = this.userData.walletAmount + 0;
        }else{
       
          this.updateData.walletAmount = this.userData.walletAmount + this.resultData.prize;
          this.updateData.coins = this.userData.coins + 0;
        }
        
        this.admin.updateUser(this.resultData.email,this.updateData)
        .subscribe(
          res => console.log('Updated Successfully'),
          err => console.log(err)
        )
      }else{
        console.log("user Not Registered Yet");
      }
    },
    err => console.log(err)

  );

  this.admin.resultSet(this.resultData)
  .subscribe(
    res => console.log('Result Set Successfully..'),
    err => console.log(err)
  );
  
}

onDualSubmit(form:NgForm,data:any , event:any){
  this.resultData.tournamentId = data.tournamentId;
  this.resultData.name = event.pubgName;
  this.resultData.email = event.emailId;
  this.resultData.status = true;
  this.resultData.rank = form.value.rank;
  this.resultData.kill = form.value.kill;
  this.resultData.prize = form.value.prize;
  this.admin.userVerification(this.resultData.email)
  .subscribe(
    res =>{
      if(res){
        this.userData = res;
        this.updateData.score = this.userData.score + this.resultData.kill;
        this.updateData.matches = this.userData.matches+1;
        if(this.playerData[0].entryFees == 0){
         
          this.updateData.coins = this.userData.coins + this.resultData.prize;
          this.updateData.walletAmount = this.userData.walletAmount + 0;
        }else{
         
          this.updateData.walletAmount = this.userData.walletAmount + this.resultData.prize;
          this.updateData.coins = this.userData.coins + 0;
        }
        this.admin.updateUser(this.resultData.email,this.updateData)
        .subscribe(
          res => console.log('Updated Successfully'),
          err => console.log(err)
        )
      }else{
        console.log("user Not Registered Yet");
      }
    },
    err => console.log(err)

  );

  this.admin.resultSet(this.resultData)
  .subscribe(
    res => console.log('Result Set Successfully..'),
    err => console.log(err)
  );
  
}

}
