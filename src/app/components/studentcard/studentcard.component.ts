import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { delay } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-studentcard',
  templateUrl: './studentcard.component.html',
  styleUrls: ['./studentcard.component.css']
})
export class StudentcardComponent implements OnInit {
  isValue!: boolean;
  
  constructor(private route:Router,
    private userservice:UserService,
    private toast:NgToastService,
    private activatedRoute:ActivatedRoute)
  {

  }


  tempForm: any;
  User_id_Param:any;
  profilePicture:any;

  ngOnInit(): void
  {
//    alert(this.profilePicture)
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.User_id_Param=params.get('User_id')
      this.onGetUser(this.User_id_Param)
    })

   // alert(this.User_id_Param)
    //this.onGetUser();
    this.tempForm=new FormGroup
    ({

        Tempareture:new FormControl('',[Validators.required]),
        isAllowedEntrence:new FormControl('',[Validators.required]),
        //Health_status_reason:new FormControl('',[Validators.required]),
        Officer_id: new FormControl('')
    }) 

   //  alert(sessionStorage.getItem('officer_id')) 

    this.setOfficerId();
  }


  setOfficerId()
  {
    this.tempForm.controls['Officer_id'].setValue(sessionStorage.getItem('officer_id'))
  }

  get Officer_id()
  {
    return this.tempForm.get('Officer_id');
  }

  get Tempareture()
  {
    return this.tempForm.get('Tempareture');
  }
  get isAllowedEntrence()
  {
    return this.tempForm.get('isAllowedEntrence');
  }

  get Health_status_reason()
  {
    return this.tempForm.get('Health_status_reason');
  }


  


/*   onGetUser(): void 
  {
    this.userservice.getUser(`${sessionStorage.getItem('user_id')}`).subscribe(
      (response: any) =>
      {

        console.log(response)
        this.users = response.data;
        console.log(this.users)

      },
      (error: any) => console.log('this is the error' + error),
      () => console.log('Done getting user'),
    );
  } */

  users!: User[];
  onGetUser(User_id:string)
  {
    this.userservice.getUser(`${User_id}`).subscribe(
      (response: any) => {
        if (response.message == 'Successful') {
          //alert(response)
          this.users = response.data;
          //alert(this.users)
        }
      },
      (error: any) => console.log('this is the error' + error),
      () => console.log('Done getting user'),
    );
  }


  onUpdateRecord()
  {
    this.userservice.updateRecord(this.tempForm.value,this.User_id_Param).subscribe(
      (response: any)=>
      {
        console.log(response);
        console.log('Update successful');
        
      },
      (error: any) => console.log('this is the error' + error),
      () => console.log('Done getting user'),
    )
    
  }

  token=this.GetToken();

  GetToken():any
  {
    localStorage.getItem('token')
  }
  //random generated by the machine
  studenttemp=this.getRandomInt(34,40);

  getRandomInt(min: number, max: number) : number
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  MachineId=this.getRandomInt(32,38);
  getRandomMachineInt(min: number, max: number) : number
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  //Check entrace status
  //temp2:number=0.0;
  message="";

  async onSubmit()
  {
    this.route.navigate(['viewpending']);
    if(this.tempForm.valid && this.checkAccessValue(this.isAllowedEntrence))
    {
      
      this.temperatureCheck(this.Tempareture.value);
      await delay(500);
      this.onUpdateRecord();
      this.toast.success({detail:"Access Message",summary:"Student Granted Access",duration:4000})
      //alert('data inserted');
      this.route.navigate(['viewpending']);
      //location.reload();
      this.tempForm.reset();
      
    }
    else if(this.tempForm.valid && !this.checkAccessValue(this.isAllowedEntrence))
    {
      alert('Enter valid access value')
    }
    else
    {
      alert('Please complete the temperature')
    }
   
  }

  

  checkAccessValue(access:Number)
  {
     if(isNaN(+access))
     {
       this.isValue=true;
     }
     else
     {
       this.isValue=false;
     }

     return this.isValue;
  }

  temperatureCheck(temp:Number)
  {
    if(temp===0)
    {
      this.message="Please enter valid temperature";
    }
    if (temp>=35.0 && temp <=37.0)
    {
      this.message="Allow access";
      console.log(this.message)
      
    }
     if(temp > 37.0)
    {
      this.message ="Deny access,Temperature too high";
      console.log(this.message)
    }
     if(temp<35.0)
    {
      this.message ="Deny access,Temperature too low";
      console.log(this.message)
    }
  }




}

