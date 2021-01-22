import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PaymentService {

  constructor(private http:HttpClient) { }

  private orderUrl ="http://localhost:3000/payment/orderId";
  private verifyUrl="http://localhost:3000/payment/paymentverify";


  orederIdGenerator(data){
    return this.http.post<any>(this.orderUrl,data);
  }

 paymentVerification(data){
   return this.http.post<any>(this.verifyUrl,data);
 }

}
