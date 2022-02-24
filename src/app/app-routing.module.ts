import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './welcome/welcome.component';
//import { LoginComponent } from './login/login.component';
import { LoginComponent } from './components/welcome/login/login.component';
//import { RegisterComponent } from './register/register.component';
import { RegisterComponent } from './components/welcome/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes =
 [
    {path:'',component:WelcomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
