import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StudentcardComponent } from '../studentcard/studentcard.component';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { User,Record, PendingRecord, Images } from 'src/app/interfaces/user';
import { RecordService } from 'src/app/services/record.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.css']
})
export class OfficerComponent implements OnInit {
  temp2:number=0.0;
  messg="";
  temp = 37.0;
  isScan=false;

    users!: User[];
    images!:Images[];
  records!:Record[];
  pendingRecords!:PendingRecord[];


    @ViewChild(MatSidenav)
    
    sidenav!: MatSidenav;
  
   
    constructor(
      private recordservice:RecordService ,
      private userservice:UserService,
      private observer: BreakpointObserver,
      public dialog:MatDialog,
      private router:Router,
      private api:ApiService) {}

      private apiUrl=environment.apiUrl;

  validateTemp(temp2:number){
    if (temp2 >=36.1 && temp2 <=37.2) {
      this.messg="Allow access";
    }else if(temp2 > 37.2){
      this.messg ="Deny access,Temperature too high";
    }else{
      this.messg ="Deny access,Temperature too low";
    }
  }

  formsearch!:FormGroup
  profilePicture:any;
  ngOnInit(): void
   {
    this.deleteOtherSessions();
    this.profilePicture=this.viewStudentProfile(sessionStorage.getItem('user_id'))
    this.formsearch=new FormGroup
    ({
      search:new FormControl('',Validators.required)
    })

  }

  get search()
  {
    return this.formsearch.get('search');
  }
  

  //show card
apimessage=''
    getStudentCard=false;
    studentdetails()
    {
      if(this.formsearch.valid)
      {
        //this.getStudentCard=true;
        this.userservice.getUser(`${this.search?.value}`).subscribe(
          (response: any) => 
          {
            if(response.message=='Successful')
            {
              this.getStudentCard=true;
              this.apimessage="";
              console.log(response)
              this.users = response.data;
              console.log(this.users)
            }
            else if(response.message=='Unsuccessful')
            {
              this.getStudentCard=false;
              this.apimessage="Please enter the correct student number";
            }
          },
          (error: any) => console.log('this is the error' + error),
          () => console.log('Done getting user'),
        );
      }
      else if(this.formsearch.invalid)
      {
        this.getStudentCard=false;
      }
      
    }

    //Check the search input if its empy or null

    studentCheck():boolean
    {
      if(typeof this.search!='undefined' && this.search)
      {
        return false;
      }
      return true;
    }

  //End card



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
    onGetUser(): void
    {
      this.userservice.getUser(`${218179088}`).subscribe(
        (response: any) => {
          console.log(response)
          this.users = response.data;
          console.log(this.users)
        },
        (error: any) => console.log('this is the error' + error),
        () => console.log('Done getting user'),
      );
    } 
   


    openDialog()
    {
      let dialogref=this.dialog.open(StudentcardComponent,{height: '800px',
      width: '50%',});
      dialogref.afterClosed().subscribe(results=>
        {
          console.log(`dialog results:'${results}`)
        }
      )
    }


  deletesession() {
    sessionStorage.removeItem('officer_id')
    this.router.navigate(['/login']);
  }

  deleteOtherSessions()
  {
    //sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('admin_id')
    
  }



  //show profile

  viewStudentProfile(studentNumber)
  {

    return `${this.apiUrl}/select_pp/view/${studentNumber}`;
    
  }
  


  }
    



