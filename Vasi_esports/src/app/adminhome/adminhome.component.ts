import { Component, OnInit } from '@angular/core';
import {AdminService} from '../Services/admin.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private admin :AdminService) { }
users :number;
  ngOnInit(): void {
  this.admin.allUsers()
  .subscribe(
    res =>{
           this.users = res.length;
    },
    err => console.log(err)
  );

  }

}
