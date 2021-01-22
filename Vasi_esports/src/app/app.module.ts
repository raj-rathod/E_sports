//import module here ....

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import {CounterModule} from 'angular-circle-counter';
import {ChartsModule} from 'ng2-charts';
import { SocialLoginModule } from 'angularx-social-login';
import { SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider  } from 'angularx-social-login';

//import services here...
import {AuthenticationService} from './authentication.service';
import {TournamentsService} from './Services/tournaments.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { HttpInterceptorService } from './http-interceptor.service';
import { UserService } from './Services/user.service';
import { AdminService } from './Services/admin.service';
import { PaymentService } from './Services/payment.service';

//import component here  .... 
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VideoComponent } from './video/video.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrationTournamentComponent } from './registration-tournament/registration-tournament.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpcomingTournamentComponent } from './upcoming-tournament/upcoming-tournament.component';
import { PastTournamentComponent } from './past-tournament/past-tournament.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { UserTournamentPartitionComponent } from './user-tournament-partition/user-tournament-partition.component';
import { UserWalletComponent } from './user-wallet/user-wallet.component';
import { UserRoomidComponent } from './user-roomid/user-roomid.component';
import { EntryFeesPaymentComponent } from './entry-fees-payment/entry-fees-payment.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { TournamentCreatComponent } from './tournament-creat/tournament-creat.component';
import { TournamentResultComponent } from './tournament-result/tournament-result.component';
import { WalletRequestComponent } from './wallet-request/wallet-request.component';
import { TournamentVerificationComponent } from './tournament-verification/tournament-verification.component';
import { VerifiedPlayerComponent } from './verified-player/verified-player.component';
import { RegisteredPlayerComponent } from './registered-player/registered-player.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';











@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VideoComponent,
    AdminComponent,
    RegistrationTournamentComponent,
    AboutComponent,
    ContactComponent,
    TournamentsComponent,
    UserRegistrationComponent,
    UserProfileComponent,
    UpcomingTournamentComponent,
    PastTournamentComponent,
    UserhomepageComponent,
    UserTournamentPartitionComponent,
    UserWalletComponent,
    UserRoomidComponent,
    EntryFeesPaymentComponent,
    AdminhomeComponent,
    TournamentCreatComponent,
    TournamentResultComponent,
    WalletRequestComponent,
    TournamentVerificationComponent,
    VerifiedPlayerComponent,
    RegisteredPlayerComponent,
    AdminAuthComponent,
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    CounterModule,
    ChartsModule,
    SocialLoginModule
    
    
  ],
  providers: [ 
    AuthenticationService,
    TournamentsService,
    AuthGuard,
    UserService,
    AdminService,
    PaymentService,
    AdminGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '565958370497-mivpljehiulphcft83jrje0ks8s8btdp.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('866192813872768'),
          },
         
        ],
      } as SocialAuthServiceConfig,
    },
    {
     provide : HTTP_INTERCEPTORS, 
     useClass : HttpInterceptorService,
     multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
