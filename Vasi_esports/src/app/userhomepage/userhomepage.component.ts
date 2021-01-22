import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user.service';

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrls: ['./userhomepage.component.css']
})
export class UserhomepageComponent implements OnInit {

  constructor(private user : UserService) { }
  rank :number =0;
 playerData =
  {"_id":"","name": "", "email" : "", "photoUrl":"","password":"","rank":0,"score":0,"matches":0,"walletAmount":0,"coins":0,"Date" : Date};
 
 private playerId = localStorage.getItem('tokenId');
  ngOnInit(): void {
    this.player(this.playerId);
    this.userRankFind(this.playerId);
  }

  player(playerId){
   this.user.userData(playerId)
   .subscribe(
     res =>{
        this.playerData = res;
        this.user.setUserEmail(res.email);
     },
     err =>{
       console.log(err);
     }
   )
  }

  userRankFind(data){
    this.user.userRank()
    .subscribe(
      res =>{
         let index = res.findIndex(x =>x._id == data);
         this.rank = index + 1;
      },
      err =>console.log(err)
    )
  }

 

}
