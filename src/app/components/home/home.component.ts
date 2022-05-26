import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { HealthFormComponent } from '../health-form/health-form.component';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  profilePicture:any

  theFormIsChecked:any;
  theButtonCheck:any;
  ngOnInit(): void
  {
  /*   if(this.buttoncheck==true && this.formcheck==false)
      {
        this.openDialog();   //open dialog imediatly when clicking qrcode and after clicking login button
      } */

      this.formcheck=this.theFormIsChecked
      if(sessionStorage.getItem(`user_id`)!=null)
      {
        this.theFormIsChecked=sessionStorage.getItem('Form_check')
      }
      this.WhoFilledForm(`${sessionStorage.getItem('user_id')}`);
      //alert(this.theButtonCheck)
      this.profilePicture=this.viewStudentProfile(sessionStorage.getItem('user_id'))
      this.getUserProfile(`${sessionStorage.getItem('user_id')}`);
  }

    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
  
    constructor(
      private toast:NgToastService,
      private userservice:UserService,
      private router:Router,
      private observer: BreakpointObserver,
      private api:ApiService,
      private dialog: MatDialog){}
      private apiUrl=environment.apiUrl;

  /* openDialog() {
    this.dialog.open(HealthFormComponent, {
      width: '30%'
    });
  } */


  ngAfterViewInit()
  {     
      this.observer
        .observe(['(max-width: 800px)'])
        .pipe(delay(1))
        .subscribe((res) => {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        });
    }

    deletesession()
    {
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('Form_check');
      sessionStorage.removeItem('buttoncheck');
      this.router.navigate(['/login']);
    }

    formcheck=false;
    buttoncheck=true;
  openDialog()
  {
    this.dialog.open(HealthFormComponent, {
      width: '30%'

  }).afterClosed().subscribe(val => 
      {
        if (val === 'formchecked')
        {
          this.toast.success({detail:"Form Check",summary:"Health Form Completed",duration:4000})
          /* this.formcheck=true;
          this.buttoncheck=false; */
         /*  sessionStorage.setItem('Form_check',`${this.formcheck}`)
          sessionStorage.setItem('buttoncheck',`${this.buttoncheck}`) */
          window.location.reload();
        }
    })


}



ShowUsername:any
ShowSurname:any
users!: User[];
getUserProfile(user:string):void
{
  this.api.getUser(user)
  .subscribe({
    next:(res:any)=>
    {
      console.log(res);
      this.users=res.data;
      this.ShowUsername=this.users[0].First_name;
      this.ShowSurname=this.users[0].Last_name;

    }})}





    viewStudentProfile(studentNumber)
    {
      return `${this.apiUrl}/select_pp/view/${studentNumber}`;
    }

    WhoFilledForm(user:string)
    {
      this.userservice.getStudentFormCheck(user).subscribe(
        data=>
        {
          //alert(data.message)
          if(data.message=='Successful')
          {
            this.theFormIsChecked=true;
            this.buttoncheck=false;
          }
          //alert(data.message)
        }
        
      )
    }

}