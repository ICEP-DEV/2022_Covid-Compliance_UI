import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
//import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//Services
import { CustomvalidationService } from './services/customvalidation.service';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HealthFormComponent } from './components/health-form/health-form.component';
import { OfficerComponent } from './components/officer/officer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddOfficerComponent } from './components/add-officer/add-officer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReportComponent } from './components/report/report.component';
import { ReportItemComponent } from './components/report/report-item/report-item.component';
import { DatePipe } from '@angular/common';
import { ManageofficersComponent } from './components/manageofficers/manageofficers.component';
import { OfficerRecordsComponent } from './components/officer-records/officer-records.component';
import { StudentcardComponent } from './components/studentcard/studentcard.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AdminfeedbackComponent } from './components/adminfeedback/adminfeedback.component';
import { OfficerprofileComponent } from './components/officerprofile/officerprofile.component';
import { ViewaccessComponent } from './components/viewaccess/viewaccess.component';
import { ViewpendingComponent } from './components/viewpending/viewpending.component';
import { UserguardGuard } from './guards/userguard.guard';
import { RegistervisitorComponent } from './components/registervisitor/registervisitor.component';
import { RegisteruserComponent } from './components/registeruser/registeruser.component';
import { NewsfeedComponent } from './components/newsfeed/newsfeed.component';
import { LandingInformationComponent } from './components/landing-information/landing-information.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
//import { StatsComponent } from './components/stats/stats.component';
import { AdminfeedComponent } from './components/adminfeed/adminfeed.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { NgToastModule } from 'ng-angular-popup';
import { VacCardComponent } from './components/vac-card/vac-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    ResetpasswordComponent,
    HealthFormComponent,
    OfficerComponent,
    HomeComponent,
    AboutUsComponent,
    ContactusComponent,
    UserProfileComponent,
    AdminComponent,
    AddOfficerComponent,
    LandingPageComponent,
    ReportComponent,
    ReportItemComponent,
    ManageofficersComponent,
    OfficerRecordsComponent,
    StudentcardComponent,
    FeedbackComponent,
    AdminfeedbackComponent,
    OfficerprofileComponent,
    ViewaccessComponent,
    ViewpendingComponent,
    RegistervisitorComponent,
    RegisteruserComponent,
    NewsfeedComponent,
    LandingInformationComponent,
    QrCodeComponent,
   // StatsComponent,
    AdminfeedComponent,
    UpdatePasswordComponent,
    VacCardComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgToastModule
  ],
  providers: [CustomvalidationService,DatePipe,UserguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
