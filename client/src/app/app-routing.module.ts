import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../components/home.component";
import { ForecastComponent } from "../components/forecast.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forecast', component: ForecastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
