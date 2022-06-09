import { OfficerService } from './../../services/officer.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs';
import { HealthFormComponent } from '../health-form/health-form.component';
import { Officer } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-officerprofile',
  templateUrl: './officerprofile.component.html',
  styleUrls: ['./officerprofile.component.css']
})
export class OfficerprofileComponent implements OnInit {

  officerprofile !: FormGroup;
  actionBtn:string = "Save";
  officers!:Officer
  constructor( private router:Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private observer: BreakpointObserver,
    private officerservice:OfficerService,
    private toast:NgToastService,
    ) { }

  ngOnInit(): void {
    this.officerprofile = this.formBuilder.group({
      Officer_id: ['', Validators.required],
     // First_name: ['', Validators.required],
     // Last_Name: ['', Validators.required],
      Email: ['', Validators.required],
      Cellphone_number: ['', Validators.required],
     // Gender: ['', Validators.required],
      Password: ['', Validators.required],
     // newPassword: ['', Validators.required],

    });
    this.getOfficerProfile(`${sessionStorage.getItem('officer_id')}`);
    //alert(`${sessionStorage.getItem('officer_id')}`)
    
  }
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  
  ngAfterViewInit() {
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
  
  ShowUsername:any
  ShowSurname:any
  getOfficerProfile(officerid: string): void
  {
    this.officerservice.getOfficerProfile(officerid)
      .subscribe({
        next: (res: any) => {
          console.log(res)
          this.officers = res.data;
          this.officerprofile.controls['Officer_id'].setValue(this.officers[0].Officer_id);
          //this.officerprofile.controls['Last_Name'].setValue(this.officers[0].Last_name);
          //this.officerprofile.controls['First_name'].setValue(this.officers[0].First_name);
          this.officerprofile.controls['Password'].setValue(this.officers[0].Password);
          this.officerprofile.controls['Cellphone_number'].setValue(this.officers[0].Cellphone_number);
          //this.officerprofile.controls['Gender'].setValue(this.officers[0].Gender);
          this.officerprofile.controls['Email'].setValue(this.officers[0].Email);
         // this.userProfile.controls['Type'].setValue(this.officers[0].Type);

          /* alert(this.users[0].User_id+this.users[0].First_name); */
          //  this.userProfile.controls.name.patchValue(res.name); // set value of single property

          this.ShowUsername=this.officers[0].First_name;
          this.ShowSurname=this.officers[0].Last_name;
        }
      })
  }

  updateOfficer(officerid: string) {
    this.officerservice.updateofficerInfo(this.officerprofile.value)
      .subscribe({
        next: (res:any) =>
        {
           this.officers = res.data;
           this.toast.success({detail:"Profile Update",summary:"Profile Information Updated",duration:3400})
           this.officerprofile.controls['Officer_id'].setValue(this.officers[0].Officer_id);
          this.officerprofile.controls['Password'].setValue(this.officers[0].Password);
          this.officerprofile.controls['Cellphone_number'].setValue(this.officers[0].Cellphone_number);
          this.officerprofile.controls['Email'].setValue(this.officers[0].Email);
         
          //this.officerprofile.reset();
          //this.toast.success({detail:"Profile Update",summary:"Profile Information Updated",duration:4000})
          //alert('Officer details UPdated')
        }, error: () => {
          alert("Error while updating user");
        }
      })
  }

  onUpdate()
  {
    this.updateOfficer(`${sessionStorage.getItem('officer_id')}`);
    //alert(`${sessionStorage.getItem('officer_id')}`)
    //location.reload()
  }

  user = (this.get())
  get() {
    sessionStorage.getItem('officer_id');
    
  }
  deletesession()
  {
    sessionStorage.removeItem('officer_id')
    this.router.navigate(['/login']);
  }

}
