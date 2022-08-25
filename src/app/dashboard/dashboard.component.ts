import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = {localId:"defaultID", userName:"Admin"}
  
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAccess();

    if(this.auth.isAuthenticated()){
      //Call user detilas Service
      this.auth.details().subscribe({
        next:data=>{
          this.user.localId = data.users[0].localId;
          this.user.userName = data.users[0].displayName;
        }
      })      
    }
  }

}
