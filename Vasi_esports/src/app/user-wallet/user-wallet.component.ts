import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {UserService} from '../Services/user.service';

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.css']
})
export class UserWalletComponent implements OnInit {

  constructor(private user : UserService) { }

  playerData =
  {"_id":"","name": "", "email" : "", "photoUrl":"","password":"","rank":0,"score":0,"matches":0,"walletAmount":0,"coins":0,"Date" : Date};
  
  private playerId = localStorage.getItem('tokenId');
   ngOnInit(): void {
     this.player(this.playerId);
   }
 
   player(playerId){
    this.user.userData(playerId)
    .subscribe(
      res =>{
         this.playerData = res;
      },
      err =>{
        console.log(err);
      }
    )
   }

  public walletFlag : boolean = false;
  errorMassage ="";
  errorFlag :boolean =false;
  onSubmit(form : NgForm){
    if(this.moneyData.amount > this.playerData.walletAmount){
      this.errorMassage = "Not sufficient Amount in your wallet ";
      this.errorFlag = true;
    }else{
      
       this.user.moneyRequest(this.moneyData)
       .subscribe(
         res => {
            this.walletFlag =false;
         },
         err =>{
            console.log(err);
         }
       )
    }


  }

  requestForm(){
    this.walletFlag = true;
  }

  moneyData :any={
    "email" : "",
    "contact" : "",
    "amount" :0,
    "paymentType" : "",
    "upiId":""
  };



}
