import { Component, OnInit } from '@angular/core';
import {TournamentsService} from '../Services/tournaments.service';
import {Router} from '@angular/router';
import { AdminService } from '../Services/admin.service';


@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  constructor(private tournament : TournamentsService,private router : Router ,private admin :AdminService) { }
  tournamentData =[];

  ngOnInit(): void {
    this.tournament.tournaments()
    .subscribe(
      res => {
        this.tournamentData = res;
      },
      err => console.log(err)
    );
    this.pastTournament();
  }

  joinPage(event){
    this.tournament.tournamentSetData(event);
    this.router.navigate(['/upcomingTournament']);
  }

  pastTournamentData :any =[];
  pastTournament(){
    this.admin.clearTournamentData()
    .subscribe(
      res => this.pastTournamentData = res,
      err => console.log(err)
    )
  }

  resultSet(data){
    this.admin.resultShow(data._id)
    .subscribe(
      res => {
        this.admin.setResultData(res);
        this.router.navigate(['/pastTournament']);
      },
      err => console.log(err)
    )
  }

}
