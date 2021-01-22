import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

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
 


}
