import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class AdminService {

  private loginUrl ="http://localhost:3000/api/adminlogin";

  private allusersUrl ="http://localhost:3000/api/users";

  private requestUrl ="http://localhost:3000/api/paymentRequest";

  private cancleUrl = "http://localhost:3000/api/paymentCancle";

  private verifyUrl = "http://localhost:3000/api/verification";

  private walletUrl = "http://localhost:3000/api/walletUpdate";

  private matchUrl = "http://localhost:3000/api/tournamentfull";

  private matchcompletedUrl = "http://localhost:3000/api/tournamentResult";

  private resultUrl = "http://localhost:3000/api/tournamentresult";

  private userResultUrl ="http://localhost:3000/api/userresult";

  private resultShowUrl="http://localhost:3000/api/tournamentresultshow";
  private deleteresultShowUrl="http://localhost:3000/api/deletetournamentresultshow";


  constructor(private http : HttpClient) { }


 public resultData :any =null;

 allUsers(){
   return this.http.get<any>(this.allusersUrl);
 }

  AuthAdmin(data){
    return this.http.post<any>(this.loginUrl,data);
  }

  AdminloggedIn(){
    return !!localStorage.getItem('_aAuthToken');
  }

  paymentRequest(){
    return this.http.get<any>(this.requestUrl);
  }

  paymentCance(data){
     let url =`${this.cancleUrl}/${data}`;
     return this.http.delete<any>(url);
  }

  userVerification(data){
    let url =`${this.verifyUrl}/${data}`;
    return this.http.get<any>(url);
  }

paymentDone(data){
   return this.http.put<any>(this.walletUrl,data);
}

matchPlayed(){
  return this.http.get<any>(this.matchUrl);
}

clearTournamentData(){
  return this.http.get<any>(this.matchcompletedUrl);
}

resultSet(data){
  return this.http.post<any>(this.resultUrl,data);
}

updateUser(event,data){
  let url =`${this.userResultUrl}/${event}`;
  return this.http.put<any>(url,data);
}

resultShow(data){
  let url =`${this.resultShowUrl}/${data}`;
  return this.http.get<any>(url);
}
////delete result....
deleteresultShow(data){
  let url =`${this.deleteresultShowUrl}/${data}`;
  return this.http.delete<any>(url);
}

setResultData(data){
  this.resultData = data;
}

getResultData(){
  return this.resultData;
}



}
