import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { StarRatingModule } from 'angular-star-rating';
import { NgCircleProgressModule } from 'ng-circle-progress';


import { from } from 'rxjs';
const MaterialComponents = [
     MatButtonModule,
     MatButtonToggleModule,
     MatMenuModule,
     MatCardModule,
     MatExpansionModule,
     MatGridListModule,
     MatIconModule,
     MatDialogModule,
     MatInputModule,
     MatFormFieldModule,
     MatSidenavModule,
     StarRatingModule.forRoot(),
     NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    })
   
  
     
];

@NgModule({
  imports: [ MaterialComponents],
  exports : [ MaterialComponents]
})
export class MaterialModule { }
