import { Component, OnInit } from '@angular/core';
import {TournamentsService} from '../Services/tournaments.service';
import {UserService} from '../Services/user.service';
import {PaymentService} from '../Services/payment.service';
import { NgForm} from '@angular/forms';
import {Router} from '@angular/router';

declare var Razorpay: any; 
@Component({
  selector: 'app-entry-fees-payment',
  templateUrl: './entry-fees-payment.component.html',
  styleUrls: ['./entry-fees-payment.component.css']
})
export class EntryFeesPaymentComponent implements OnInit {

  constructor(private tournament : TournamentsService, private router :Router,private user : UserService, private payment :PaymentService) { }


  public entryData :any={"_id":"","tournamentName":"","tournamentType":"","tournamentDate":"","tournamentTime":"","entryFees":"","prizeMoney":""};
  public hidepayment :boolean = true;
  public orderData :any={};
  public error :boolean =false;
  public errorMassage :any;
  playerData ={"_id":"","name": "", "email" : "", "photoUrl":"","password":"","rank":0,"score":0,"matches":0,"walletAmount":0,"coins":0,"Date" : Date};
 

 private playerId = localStorage.getItem('tokenId');

  ngOnInit(): void {
   
    if(this.tournament.tournamentGetData()==null){
       this.router.navigate(['/tournaments']);
    }else{
      this.entryData = this.tournament.tournamentGetData();
      
    }
    this.player(this.playerId);
    this.orderId();
  }
  paymentModeflag :boolean =false;
 paymentMode(){
   this.paymentModeflag = true;
 }

 paymentQrMode(){
  this.paymentModeflag = false;
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


 ///join solo section...
 public soloData :any ={
     "tournamentId":"",
     "tournamentName" :"",
     "tournamentDate" :"",
     "tournamentTime" :"",
     "tournamentType" :"",
     "entryFees":0,
     "pubgName" : "",
     "emailId" : "",

 };
////online payment join
 joinSolo(form :NgForm){
   this.soloData.tournamentId = this.entryData._id;
   this.soloData.tournamentName = this.entryData.tournamentName;
   this.soloData.tournamentDate = this.entryData.tournamentDate;
   this.soloData.tournamentTime = this.entryData.tournamentTime;
   this.soloData.tournamentType = this.entryData.tournamentType;
   this.soloData.entryFees = this.entryData.entryFees;
   this.tournament.soloJoin(this.soloData).subscribe(
    res => this.router.navigate(['/userprofile']),
    err => {
     if(err.status == 401){
       this.error =true;
       this.errorMassage = err.error[0];
       
     }else{
       this.error =true;
       this.errorMassage ="Something went wrong try again later";
     }
    }
  );
 
   
 }


 ///join dual section....
 public dualData :any ={
  "tournamentId":"",
  "tournamentName" :"",
  "tournamentDate" :"",
  "tournamentTime" :"",
  "tournamentType" :"",
  "entryFees":0,
  "pubgName" : "",
  "emailId" : "",
  "subPlayer":{
    "pubgName" : "",
    "emailId" : ""
  },

};
/// online join
joinDual(form :NgForm){
  this.dualData.tournamentId = this.entryData._id;
  this.dualData.tournamentName = this.entryData.tournamentName;
  this.dualData.tournamentDate = this.entryData.tournamentDate;
  this.dualData.tournamentTime = this.entryData.tournamentTime;
  this.dualData.tournamentType = this.entryData.tournamentType;
  this.dualData.entryFees = this.entryData.entryFees;
  this.tournament.dualJoin(this.dualData).subscribe(
    res => this.router.navigate(['/userprofile']),
    err => {
      if(err.status == 401){
        this.error =true;
        this.errorMassage = err.error[0];
        
      }else{
        this.error =true;
        this.errorMassage ="Something went wrong try again later";
      }
     }
  );
  
 

}

////join squad section......
public squadData :any ={
  "tournamentId":"",
  "tournamentName" :"",
  "tournamentDate" :"",
  "tournamentTime" :"",
  "tournamentType" :"",
  "entryFees":0,
  "pubgName" : "",
  "emailId" : "",
  "subPlayer":{
    "player1":{
      "pubgName" : "",
      "emailId" : ""
    },
    "player2":{
      "pubgName" : "",
      "emailId" : ""
    },
    "player3":{
      "pubgName" : "",
      "emailId" : ""
    },
  },

};
///online payment join
joinSquad(form:NgForm){
  this.squadData.tournamentId = this.entryData._id;
  this.squadData.tournamentName = this.entryData.tournamentName;
  this.squadData.tournamentDate = this.entryData.tournamentDate;
  this.squadData.tournamentTime = this.entryData.tournamentTime;
  this.squadData.tournamentType = this.entryData.tournamentType;
  this.squadData.entryFees = this.entryData.entryFees;
  this.tournament.squadJoin(this.squadData).subscribe(
    res => this.router.navigate(['/userprofile']),
    err => {
      if(err.status == 401){
        this.error =true;
        this.errorMassage = err.error[0];
        
      }else{
        this.error =true;
        this.errorMassage ="Something went wrong try again later";
      }
     }
  )
  
}


///joining setion end...
paymentData:any ={"email":"","amount":""};

 paymentDone(event,data){

   this.paymentData.email = event.email;
   this.paymentData.amount = event.walletAmount - data.entryFees;
   this.tournament.walletPayment(this.paymentData)
    .subscribe(
      res => {
        this.hidepayment = false;
      },
      err =>{
        console.log(err);
      }
    )
   
 }
  options = {
  "key": "rzp_test_WXv5T6A8qR6r2N", // Enter the Key ID generated from the Dashboard
  "amount":  '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": "INR",
  "name": "Vasi Esports",
  "description": "Tournament Entry fees transaction",
  "image": "../../assets/image/payment.jpg",
  "order_id": '', 
  "handler":function (response){},
  "prefill": {
      "name":'',
      "email":''
  },
  "notes": {
      "address": "Vasi Esport Bangalore"
  },
  "theme": {
      "color": "#088ecc"
  }
};
///online Payment function...
onlinePayment(){
this.options.amount = this.entryData.entryFees;
this.options.order_id = this.orderData.id;
this.options.handler = this.handlerFunc.bind(this);
this.options.prefill.email = this.playerData.email;
this.options.prefill.name = this.playerData.name;
var rzp1 = new Razorpay(this.options);
rzp1.open();
}
paymentbtn :boolean =true;
handlerFunc(response :any){
  let verifyData :any={
    "paymentId" :"",
    "orderId" :"",
    "signature":""
  }
    verifyData.paymentId  =response.razorpay_payment_id;
    verifyData.orderId = response.razorpay_order_id;
    verifyData.signature = response.razorpay_signature;
    this.payment.paymentVerification(verifyData).subscribe(
     res =>{
       if(res.status){
         this.myFunc();
       }else{
        this.paymentbtn = true;
       }
     },
     err =>console.log(err)
   )
}
 

myFunc(){
  this.paymentbtn = false;
}

orderId(){
  let options ={
    "amount" : (this.entryData.entryFees *100),
    "currency":"INR",
    "receipt" :"Vasi Esport",
    "payment_capture" :"0"
   };
   if(this.entryData.entryFees == 0){
     this.paymentModeflag = true;
   }else{
    this.payment.orederIdGenerator(options)
    .subscribe(
      res => {this.orderData =res;
     },
      err =>console.log(err)
    );
   }
   

  }



}
