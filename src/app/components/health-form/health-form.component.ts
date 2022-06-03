import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { HealthformService } from 'src/app/services/health-form.service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-health-form',
  templateUrl: './health-form.component.html',
  styleUrls: ['./health-form.component.css']
})
export class HealthFormComponent implements OnInit {
  fileName = '';
  healthform:any;
  submitted=false;
  hide=true;
  constructor(
    /* private formService:HealthFormService,  */
    private formservice:HealthformService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<HealthFormComponent>,
    private api:ApiService,
    private http:HttpClient,
    private userservice:UserService,
    )
     { }
     pic_path: any;
     users!: User[];
     private apiUrl=environment.apiUrl;
  ngOnInit(): void {

    
    this.healthform=new FormGroup
    (
      {
        User_id:new FormControl(''),
        vstatus:new FormControl('',[Validators.required]),
        covid19:new FormControl('',[Validators.required]),
        recentCough:new FormControl('',[Validators.required]),
        difficultyBreathing:new FormControl('',[Validators.required]),
        lossOfTaste:new FormControl('',[Validators.required]),
        heavyHeadache:new FormControl('',[Validators.required]),
        infectedPerson:new FormControl('',[Validators.required]),
     
      },
    
    );

    this.setUserId()
   

  }
 
  get User_id()
  {
    return this.healthform.get('User_id');
  }
  get vstatus()
  {
    return this.healthform.get('vstatus');
  }
  get covid19()
  {
    return this.healthform.get('covid19');
  }

  get recentCough()
  {
    return this.healthform.get('recentCough');
  }
  get difficultyBreathing()
  {
    return this.healthform.get(' difficultyBreathing');
  }
  get lossOfTaste()
  {
    return this.healthform.get('lossOfTaste');
  }
  get  heavyHeadache()
  {
    return this.healthform.get(' heavyHeadache');
  }
  get infectedPerson()
  {
    return this.healthform.get('infectedPerson');
  }
  


  setUserId()
  {
    this.healthform.controls['User_id'].setValue(sessionStorage.getItem('user_id'))
  }

  onFileSelected(event: any) {
    this.pic_path = event.target.files[0];
    console.log(this.pic_path)
  }
 
  user=(this.get())
      get()
      {
        sessionStorage.getItem('user_id');
      }
      deletesession()
      {
        sessionStorage.removeItem('user_id')
      }


  //User_id: string = "";
  postHealthData()
  {
    //alert(this.vstatus.value);
    this.formservice.form(this.healthform.value).pipe(first()).subscribe(
        data => {
          console.log(data);
          let formData = new FormData()
      formData.append('User_id',`${sessionStorage.getItem('user_id')}`)
      formData.append('pic_path', this.pic_path)
      //fd.append('pic_path',this.selectedFile,this.selectedFile.name);
    
      this.http.put(`${this.apiUrl}/insert_vaccination_card/insert_vaccinationCard`,formData).subscribe(
          res => {
            alert("Is inside")
            console.log(res)
          }
      )
        this.dialogRef.close('formchecked');
        },
      );

  /*   if(this.healthform.valid){
      alert('form valid');
    }
    if(this.healthform.invalid){
      alert('form invalid');
    } */
  }



  onSubmit()
  {
    this.submitted=true;
    if(this.healthform.valid)
    {
      alert('form submitted successfully');
      console.table(this.healthform.value);
      
    }
  }
 


}