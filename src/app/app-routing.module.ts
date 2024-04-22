import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MsgComponent } from './components/msg/msg.component';
import { ResetPasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthGuard } from './shared/auth.guard';
import { AccueilComponent } from './components/accueil/accueil.component';
import { RoleGuard } from './shared/role.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, 
  {path :"register",component:RegisterComponent},
  {path :"login",component:LoginComponent},
  {path :"dashboard",component:DashboardComponent,canActivate:[AuthGuard ,RoleGuard]},
  {path :'msg',component:MsgComponent},
  {path :'resetpassword',component:ResetPasswordComponent},
  {path :'accueil',component:AccueilComponent,canActivate:[AuthGuard]},
  {path :'accueil',component:AccueilComponent,canActivate:[AuthGuard]},
  {path :'profile',component:ProfileComponent,canActivate:[AuthGuard]},




];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
