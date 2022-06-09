import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HealthFormComponent } from '../health-form/health-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { UpdateUser, User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { ViewImage, ViewProfilePicture } from 'src/app/interfaces/file-to-upload';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile !: FormGroup;
  actionBtn:string = "Update";

  private apiUrl=environment.apiUrl;
  Subscription: any;
  constructor( 
    private toast:NgToastService,
    private router:Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private observer: BreakpointObserver,
    private api:ApiService,
    private userservice:UserService,
    private http:HttpClient
    ) {}
  
    users!: User[];
    userInte!:User;
    profilePicture:any
  ngOnInit(): void
  {
    //this.view();
    //alert(this.view())
    this.profilePicture=this.viewStudentProfile(sessionStorage.getItem('user_id'))
    this.userProfile = this.formBuilder.group
    ({
    
      User_id: ['', Validators.required],
      //Camp_id: ['', Validators.required],
      //First_name: ['', Validators.required],
      //Last_name: ['', Validators.required],
      Email: ['', Validators.required],
      //Type: ['', Validators.required],
      Cellphone_number: ['', Validators.required],
      //Gender: ['', Validators.required],
      Password: ['', Validators.required],
      //newPassword: ['', Validators.required],
    });
    
    this.getUserProfile(`${sessionStorage.getItem('user_id')}`);
   // alert(`${sessionStorage.getItem('user_id')}`)
  
    //this.userProfile.controls['Password'].setValue(this.userInte.User_id);
   // this.userProfile.controls['Password'].setValue(this.userInte.Password);
  }
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  openDialog() {
    this.dialog.open(HealthFormComponent, {
      width: '30%'
    });
  }
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

          
          getUserProfile(user:string):void
          {
            this.api.getUser(user)
            .subscribe({
              next:(res:any)=>
              {
                console.log(res)
                this.users=res.data;
                this.userProfile.controls['User_id'].setValue(this.users[0].User_id);
                this.userProfile.controls['Password'].setValue(this.users[0].Password);
                this.userProfile.controls['Cellphone_number'].setValue(this.users[0].Cellphone_number);
                this.userProfile.controls['Email'].setValue(this.users[0].Email);
               
                this.ShowUsername=this.users[0].First_name;
                this.ShowSurname=this.users[0].Last_name;

              }})}



          UpdateUsers!: UpdateUser[];
          updateUser(userid: string)
          {
            this.userservice.updateoUserInfo(this.userProfile.value)
              .subscribe({
            next: (res: any) =>
            {
              
              
              console.log(res);
              this.toast.success({detail:"Profile Update",summary:"Profile Information Updated",duration:4000})
              this.UpdateUsers = res.data;
              this.userProfile.controls['User_id'].setValue(this.UpdateUsers[0].User_id);
              this.userProfile.controls['Password'].setValue(this.UpdateUsers[0].Password);
              this.userProfile.controls['Cellphone_number'].setValue(this.UpdateUsers[0].Cellphone_number);
              this.userProfile.controls['Email'].setValue(this.UpdateUsers[0].Email); 
              
              //this.officerprofile.reset();
            
            alert('User details UPdated')
            }, error: () => {
              alert("Error while updating user");
            }
          })
         }

  onUpdate() {
    this.updateUser(`${sessionStorage.getItem('user_id')}`);
   // alert(`${sessionStorage.getItem('user_id')}`)
   
    //location.reload()
  }

      user=(this.get())
      get()
      {
        sessionStorage.getItem('user_id');
      }
      deletesession()
      {
        sessionStorage.removeItem('user_id')
        this.router.navigate(['/login']);
      }



      pic_path: any;
      User_id: string = "";
    
    /*   getName(name: string) {
        this.name = name;
      } */
      onFileSelected(event: any) {
        this.pic_path = event.target.files[0];
        //console.log('File '+this.pic_path)
        console.log(this.pic_path)
      }
    
      onUpload() {
        let formData = new FormData()
        formData.append('User_id',`${sessionStorage.getItem('user_id')}`)
        formData.append('pic_path', this.pic_path)
        //fd.append('pic_path',this.selectedFile,this.selectedFile.name);
        this.toast.info({detail:"Profile Message",summary:"Profile Picture Uploaded",duration:3500})
        
        this.userservice.uploadProfilePicture(formData).subscribe(res=>
          {})

          
        /* this.http.put(`${this.apiUrl}/upload_pp/upload_pp`,formData).subscribe(
          res => {
            console.log(res)
            
          }

         
        ) */
        //this.onView();
        
      }
    
      //pic: string = 'pic_path-1650626677588.png';
      //profile_pics!:ViewProfilePicture[];
    
    
      viewStudentProfile(studentNumber)
      {

        return `${this.apiUrl}/select_pp/view/${studentNumber}`;
        
      }


      /* reload()
      {
        this.router.
      } */
  /*     view():void
      {
        this.userservice.onView(`${sessionStorage.getItem('user_id')}`)
            .subscribe({
              next:(res:any)=>
              {
                alert("Something");
                console.log(res)
              }
      })

      } */


}
  


   /*    pic_path:any;
      User_id:any;
      onFileSelected(event: any) {
        this.pic_path = event.target.files[0];
        //console.log('File '+this.pic_path)
        console.log(this.pic_path)
      }

      onUpload() {
        let formData = new FormData()
        formData.set('User_id',`${sessionStorage.getItem('user_id')}`)
        formData.set('pic_path', this.pic_path)
        //fd.append('pic_path',this.selectedFile,this.selectedFile.name);
    
        this.http.put('${this.apiUrl}/upload_pp/upload_pp', formData).subscribe(
          res => {
            console.log(res)
          }
        )
        this.onView();
        
      }

      images!: ViewImage[];

      image:any;
      onView() {
        this.http.get("${this.apiUrl}/select_pp/view/218179088").subscribe(
          (res: any) => {

            alert(res);
            this.image= res.data

            alert((this.image));
            /* console.log("This is the paths "+this.images[0].pic_path);
            console.log(this.images[0].pic_path); */
            //console.log(res)
        //  }
        //  );
        //} 


        



/*   updateUser()
  {
    this.api.updateUser(this.userProfile.value)
    .subscribe({
      next:(res)=>{
        alert("user details updated Successfully");
        this.userProfile.reset();
      },error:()=>{
        alert("Error while updating user");
      }
    })
  } */
/*    getUser(){
     this.api.getUser(`$(this.user)`)
     .subscribe({
       next:(res:any)=>{
         console.log(res)
         this.userProfile.patchValue(res);
       //  this.userProfile.controls.name.patchValue(res.name); // set value of single property
 
       }})} */