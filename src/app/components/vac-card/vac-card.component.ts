import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vac-card',
  templateUrl: './vac-card.component.html',
  styleUrls: ['./vac-card.component.css']
})
export class VacCardComponent implements OnInit {
  profilePicture: any;

  constructor(private toast:NgToastService,private http:HttpClient,
    private api:ApiService,
    private userservice:UserService,
    private router:Router) { }


  private apiUrl=environment.apiUrl;
  vacCard:any
  vaccinationCard:any;


  ngOnInit(): void
  {
    this.vaccinationCard=this.viewVaccCard(`${sessionStorage.getItem('user_id')}`);
    this.WhoFilledForm(`${sessionStorage.getItem('user_id')}`);
    this.profilePicture=this.viewStudentProfile(sessionStorage.getItem('user_id'))
    this.checkUserType();
  }


  viewVaccCard(studentNumber)
  {
    return `${this.apiUrl}/select_vaccination/view/${studentNumber}`;
  }

  pic_path: any;
  onFileSelected(event: any) {
    this.pic_path = event.target.files[0];
    console.log(this.pic_path)
  }

  onUpload() {
    let formData = new FormData()
    formData.append('User_id',`${sessionStorage.getItem('user_id')}`)
    formData.append('pic_path', this.pic_path)
    //fd.append('pic_path',this.selectedFile,this.selectedFile.name);
    this.toast.info({detail:"Vaccination Message",summary:"Vaccination card Uploaded",duration:3500})
    this.http.put(`${this.apiUrl}/insert_vaccination_card/insert_vaccinationCard`,formData).subscribe(
      res => {
       
        console.log(res)
        
      }
    )
      location.reload();
    //this.onView();
    
  }



  userType=sessionStorage.getItem('isVisitor')
  disableElements=true;
  checkUserType():void
  {
    if(this.userType=='0')
    {
      this.disableElements=false;
    }

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

    }})
  }


  theFormIsChecked:any;
  theButtonCheck:any;
  formcheck=false;
    buttoncheck=true;
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

  viewStudentProfile(studentNumber)
  {
    return `${this.apiUrl}/select_pp/view/${studentNumber}`;
  }


  deletesession()
  {
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('Form_check');
    sessionStorage.removeItem('buttoncheck');
    this.router.navigate(['/login']);
  }
  
}
