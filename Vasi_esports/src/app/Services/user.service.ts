import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http : HttpClient) { }

  private userUrl = "http://localhost:3000/api/user";
  private rankUrl ="http://localhost:3000/api/userRank";
  private moneyUrl ="http://localhost:3000/api/moneyRequest";
  private topuserUrl ="http://localhost:3000/api/topUser";
  private soloUrl = "http://localhost:3000/api/solomymatch";
  private dualUrl = "http://localhost:3000/api/dualmymatch";
  private squadUrl = "http://localhost:3000/api/squadmymatch";
  private tournamentUrl ="http://localhost:3000/api/tournament";
  private soloparticipantUrl ="http://localhost:3000/api/soloparticipant";
  private dualparticipantUrl ="http://localhost:3000/api/dualparticipant";
  private squadparticipantUrl ="http://localhost:3000/api/squadparticipant";
  private deletesoloparticipantUrl ="http://localhost:3000/api/deletesoloparticipant";
  private deletedualparticipantUrl ="http://localhost:3000/api/deletedualparticipant";
  private deletesquadparticipantUrl ="http://localhost:3000/api/deletesquadparticipant";
  private emailid :any;

  private participantData :any=[];


userRank(){
  return this.http.get<any>(this.rankUrl);
}

  userData(data){
    let url =`${this.userUrl}/${data}`;
    return this.http.get<any>(url);
  }

  setUserEmail(data){

   this.emailid = data;

  }
  
  getUserEmail(){
    return this.emailid;
  }

  setParticipantData(data){
    this.participantData = data;
  }

  getParticipantData(){
    return this.participantData; 
  }
   
  moneyRequest(data){
    return this.http.post<any>(this.moneyUrl,data);
  }

  topUser(){
    return this.http.get<any>(this.topuserUrl);
  }

  soloMyMatch(data){
    let url =`${this.soloUrl}/${data}`;
    return this.http.get<any>(url);
  }

  dualMyMatch(data){
    let url =`${this.dualUrl}/${data}`;
    return this.http.get<any>(url);
  }
  
  squadMyMatch(data){
    let url =`${this.squadUrl}/${data}`;
    return this.http.get<any>(url);
  }

  joinTournaments(data){
    let url =`${this.tournamentUrl}/${data}`;
    return this.http.get<any>(url);
  }

soloParticipant(data){
  let url =`${this.soloparticipantUrl}/${data}`;
    return this.http.get<any>(url);
}

dualParticipant(data){
  let url =`${this.dualparticipantUrl}/${data}`;
    return this.http.get<any>(url);
}

squadParticipant(data){
  let url =`${this.squadparticipantUrl}/${data}`;
    return this.http.get<any>(url);
}
/////delete particiapant  ....
deletesoloParticipant(data){
  let url =`${this.deletesoloparticipantUrl}/${data}`;
    return this.http.delete<any>(url);
}

deletedualParticipant(data){
  let url =`${this.deletedualparticipantUrl}/${data}`;
    return this.http.delete<any>(url);
}

deletesquadParticipant(data){
  let url =`${this.deletesquadparticipantUrl}/${data}`;
    return this.http.delete<any>(url);
}

}
