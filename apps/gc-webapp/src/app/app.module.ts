import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MiningComponent } from './mining/mining.component';
import { HeaderComponent } from './common/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GCCoreService } from '@globalchange/core';

@NgModule({
  declarations: [
    AppComponent,
    MiningComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatFormFieldModule],
  providers: [
    {
      provide: 'GLOBAL_CHANGE_CORE_SERVICE',
      useValue: new GCCoreService(),
    },],
  bootstrap: [AppComponent],
})
export class AppModule {}
