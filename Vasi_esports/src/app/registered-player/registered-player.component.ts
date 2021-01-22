import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registered-player',
  templateUrl: './registered-player.component.html',
  styleUrls: ['./registered-player.component.css']
})
export class RegisteredPlayerComponent implements OnInit {

  constructor(private user:UserService, private router :Router) { }
   
  public participantData :any =[];

  ngOnInit(): void {
    if(this.user.getParticipantData().length >0)  {
      this.participantData = this.user.getParticipantData();
    }else{
      this.router.navigate(['/tournaments']);
    }
  }

}
