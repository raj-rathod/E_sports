import { Component, OnInit } from '@angular/core';
import {AdminService} from '../Services/admin.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-wallet-request',
  templateUrl: './wallet-request.component.html',
  styleUrls: ['./wallet-request.component.css']
})
export class WalletRequestComponent implements OnInit {

  constructor(private admin :AdminService) { }
  requestData =[];
  playerData =
    {"_id":"","name": "", "email" : "", "photoUrl":"","password":"","rank":0,"score":0,"matches":0,"walletAmount":0,"coins":0,"Date" : ""}
   ;

   verificationflag : boolean = false;

  ngOnInit(): void {
   this.requests();
  }
 

  requests(){
    this.admin.paymentRequest()
    .subscribe(
      res => {
        this.requestData =  res;
        
      },
      err => console.log(err)
    )
  }

  paymentVerification(event){
   this.admin.userVerification(event)
   .subscribe(
     res => {
      this.playerData = res;
      this.verificationflag =true;
     
     
     },
     err => {
       console.log(err);
     }
     
   )
  }

  paymentDone(event){
    this.admin.userVerification(event.email)
  .subscribe(
    res => {
     this.playerData = res;
     
     event.amount = this.playerData.walletAmount - event.amount;
     this.admin.paymentDone(event).subscribe(res => {
          this.requestCancle(event._id);
     },
     err =>console.log(err)
     );
    },
    err => {
      console.log(err);
    }  
  );
  }

  backBtn(){
    this.verificationflag =false;
  }

  requestCancle(event){
     this.admin.paymentCance(event)
     .subscribe(
       res => {
         this.requests();
       },
       err =>console.log(err)
     )
  }



}
