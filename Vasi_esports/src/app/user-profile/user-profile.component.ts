import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor( private router :Router) { }

  ngOnInit(): void {
  }

  sidenavClose(event :any){
    event.close();
  }

homePage(event:any){
  event.close();
}

playedGame(event:any){
  
  event.close();
}

leaderBoard(event :any){
  
  event.close();
}

scoreBoard(event :any){
  event.close();
}


progressBoard(event :any){
  event.close();
}

logOut(event :any){
  event.close();
  
  localStorage.removeItem('tokenId');
  localStorage.removeItem('_vAuthToken');
  this.router.navigate(['/home']);
}


}
