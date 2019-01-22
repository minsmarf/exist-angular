import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path : 'movies', component : HomeComponent},
  { path : 'movies/:id', component : EditComponent},
  { path : 'movies/:id/review', component : ReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
