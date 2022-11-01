import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MiningComponent } from './mining/mining.component';
import { HeaderComponent } from './common/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    MiningComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
