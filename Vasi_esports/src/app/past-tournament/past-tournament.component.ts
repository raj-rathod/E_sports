import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AdminService } from '../Services/admin.service';
import {UserService} from '../Services/user.service';

@Component({
  selector: 'app-past-tournament',
  templateUrl: './past-tournament.component.html',
  styleUrls: ['./past-tournament.component.css']
})
export class PastTournamentComponent implements OnInit {

  constructor(private router :Router, private admin :AdminService,private user:UserService) { }
 resultData :any =[{"name":"a","rank":"2","kill":"1","prize":" "}];
 tournamentdata :any={
   
 };
  ngOnInit(): void {
    if(this.admin.getResultData()==null){
      this.router.navigate(['/tournaments']);
    }else{
      this.resultData =this.admin.getResultData();
      this.user.joinTournaments(this.resultData[0].tournamentId)
      .subscribe(
        res => this.tournamentdata = res,
        err => console.log(err)
      )
    }
  }

}
