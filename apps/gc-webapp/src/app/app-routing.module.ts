import { NgModule } from '@angular/core';
import { MiningComponent } from './mining/mining.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'mining',  component: MiningComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
