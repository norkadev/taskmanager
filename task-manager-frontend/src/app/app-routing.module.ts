import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { LoginActivate  } from './service/login.activate';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[LoginActivate]},
  { path: 'create', component: CreateTaskComponent, canActivate:[LoginActivate] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoginActivate],
  exports: [RouterModule]
})
export class AppRoutingModule { }
