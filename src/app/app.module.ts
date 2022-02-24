import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { LogoComponent } from './../logo/logo.component';
import { LogoComponent } from './components/welcome/logo/logo.component';
//import { LoginComponent } from './login/login.component';
import { LoginComponent } from './components/welcome/login/login.component';
import { FooterComponent } from './components/welcome/footer/footer.component';
//import { RegisterComponent } from './register/register.component';
import { RegisterComponent } from './components/welcome/register/register.component';
//import { IndexComponent } from './index/index.component';
import { IndexComponent } from './components/welcome/index/index.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,IndexComponent, WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
