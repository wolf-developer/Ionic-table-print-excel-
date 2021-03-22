// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
// import { HomePage } from './home.page';

// import { HomePageRoutingModule } from './home-routing.module';


// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//     HomePageRoutingModule
//   ],
//   declarations: [HomePage]
// })
// export class HomePageModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { JwPaginationComponent } from 'jw-angular-pagination';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: [
    HomePage,
    JwPaginationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}