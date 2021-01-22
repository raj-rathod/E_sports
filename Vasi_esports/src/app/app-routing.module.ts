import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import {AdminGuard} from './admin.guard';


// routing components import here

import {TournamentsComponent } from './tournaments/tournaments.component';
import { RegistrationTournamentComponent } from './registration-tournament/registration-tournament.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminComponent } from './admin/admin.component';
import {  UpcomingTournamentComponent } from './upcoming-tournament/upcoming-tournament.component';
import { PastTournamentComponent } from './past-tournament/past-tournament.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { UserTournamentPartitionComponent } from './user-tournament-partition/user-tournament-partition.component';
import { UserWalletComponent} from './user-wallet/user-wallet.component';
import { UserRoomidComponent } from './user-roomid/user-roomid.component';
import { EntryFeesPaymentComponent} from './entry-fees-payment/entry-fees-payment.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { TournamentCreatComponent } from './tournament-creat/tournament-creat.component';
import { TournamentVerificationComponent} from './tournament-verification/tournament-verification.component';
import { WalletRequestComponent } from './wallet-request/wallet-request.component';
import { TournamentResultComponent} from './tournament-result/tournament-result.component';
import { VerifiedPlayerComponent } from './verified-player/verified-player.component';
import { RegisteredPlayerComponent} from './registered-player/registered-player.component';
import { AdminAuthComponent} from './admin-auth/admin-auth.component';

 





const routes: Routes = [
  { path :'', redirectTo:'/home', pathMatch:'full'},
  { path:'home', component : RegistrationTournamentComponent },
  { path :'tournaments', component : TournamentsComponent },
  { path : 'registration', component : UserRegistrationComponent},
  { path : 'userprofile',component : UserProfileComponent , canActivate: [AuthGuard] ,children :[

    { path :'', redirectTo:'userhomepage', pathMatch:'full'},
    { path : 'userhomepage', component :UserhomepageComponent }, 
    { path : 'userparticipant', component : UserTournamentPartitionComponent},
    { path : 'userwallet', component : UserWalletComponent},
    { path : 'userroomid', component : UserRoomidComponent} 
    
  ]},
  { path :'adminauth', component:AdminAuthComponent},
  { path : 'admin', component : AdminComponent ,canActivate: [AdminGuard], children :[
    { path :'', redirectTo:'adminhome', pathMatch:'full'},
    { path:'adminhome', component :AdminhomeComponent }, 
    { path : 'tournamentcreat', component : TournamentCreatComponent},
    { path : 'tournamentverification', component : TournamentVerificationComponent},
    { path : 'walletrequest', component : WalletRequestComponent},
    { path : 'tournamentresult', component : TournamentResultComponent} ,
    { path : 'verifiedplayer' , component : VerifiedPlayerComponent }

  ] },
  
  { path : 'upcomingTournament' , component : UpcomingTournamentComponent},
  { path : 'pastTournament' , component : PastTournamentComponent},
  { path : 'entry', component: EntryFeesPaymentComponent,
  canActivate: [AuthGuard]},
  { path : 'registered', component: RegisteredPlayerComponent}


 
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
