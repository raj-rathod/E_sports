import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TournamentsService {

  constructor(private  http :HttpClient) { }

  private tournamentData :any = null;

  private CreateUrl ="http://localhost:3000/api/tournamentCreate";
  private createMatchUrl ="http://localhost:3000/api/tournamentsCreated";
  private deleteMatchUrl = "http://localhost:3000/api/tournamentDelete";
  private postMatchUrl = "http://localhost:3000/api/tournamentPublic";
  private tournamentsUrl = "http://localhost:3000/api/tournaments";
  private soloUrl ="http://localhost:3000/api/solotournament";
  private dualUrl ="http://localhost:3000/api/dualtournament";
  private squadUrl ="http://localhost:3000/api/squadtournament";
  private walletUrl ="http://localhost:3000/api/walletUpdate";

  private roomIdUrl ="http://localhost:3000/api/registrationClosed";
 tournamentCreate(data){
   return this.http.post<any>(this.CreateUrl, data);
 }

 tournamentCreated(){
   return this.http.get<any>(this.createMatchUrl);
 }
////delete tournament....
 tournamentDelete(data){
     const url = `${this.deleteMatchUrl}/${data}`;
     return this.http.delete<any>(url);
 }

tournamentPublic(data){
  const url  =`${this.postMatchUrl}/${data}`;
  return this.http.put<any>(url,data);
}

tournaments(){
  return this.http.get<any>(this.tournamentsUrl);
}

tournamentSetData(data){
  this.tournamentData = data;
}

tournamentGetData(){
  return this.tournamentData;
}

//solo join...
soloJoin(data){
   return this.http.post<any>(this.soloUrl,data);
}

///dual Join...
dualJoin(data){
  return this.http.post<any>(this.dualUrl,data);
}

///squad join...
squadJoin(data){
  return this.http.post<any>(this.squadUrl,data);
}
///wallet Payment....
walletPayment(data){
  return this.http.put<any>(this.walletUrl,data);
}

/// Registration closed and room id set...

updateTournament(event ,data){
  let url =`${this.roomIdUrl}/${event}`;
  return this.http.put<any>(url,data);
}

///Past tournament set show result..

}
