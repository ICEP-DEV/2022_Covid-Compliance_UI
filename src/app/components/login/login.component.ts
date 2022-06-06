import { AdminService } from './../../services/admin.service';
import { Typeuser } from './../../interfaces/usertypes/typeuser';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
//import { userlogin } from './../../services/user.service';
import { UserService } from 'src/app/services/user.service';
import { OfficerLogin } from './../../interfaces/user';
import { OfficerService } from './../../services/officer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { Typelist } from 'src/app/interfaces/usertypes/typelist';
import { Token } from '@angular/compiler';
import { VisitorserviceService } from 'src/app/services/visitorservice.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
 {
  [x: string]: any;

  hide=true;
  constructor(
    private toast:NgToastService,
    private router:Router,
    private userservice:UserService,
    private visitorservice:VisitorserviceService,
    private officerservice:OfficerService,
    private customValidator:CustomvalidationService,
    private adminservice:AdminService,
    ) { }
  submitted=false;
  //user_type:string[]=['Admin','Officer','Guest','Staff','Student'];

  loginForm:any;
  value:any;
  userinfo:any;


  ngOnInit()
  {
    this.deletesession();

    this.loginForm=new FormGroup
    ({
      user_type:new FormControl('',[Validators.required]),
      User_id:new FormControl('',[Validators.required,Validators.pattern('^(0|[1-9][0-9]*)$'),Validators.minLength(5)]),
      Password:new FormControl('',[Validators.required,Validators.minLength(8),this.customValidator.patternPassValidator()])

    })

    
  }

  users = Typelist;
  selectedUser!: Typeuser;

  onSelectuser(userType:Typeuser):void
  {
    this.selectedUser=userType;
  }
  
get User_id()
{
    return this.loginForm.get('User_id');
}
get Password()
{
  return this.loginForm.get('Password');
}
 


  isVisitor='0'

//user Type Selection
 UserSelected(value:any)
 {
  this.customFunction(value);

  switch(value)
  {
    case 1:
      {
        //alert('This is the admin talking');
        
        this.adminservice.loginAdmin(this.loginForm.value).pipe(first()).subscribe(
          data => {

            if (data.message == 'Successful') {
              /* const redirect = this.userservice.redirecturl ? this.userservice.redirecturl : '/qrcode'; */
              this.router.navigate(['admin']);
              sessionStorage.setItem('admin_id',data.User_id);
              this.toast.success({detail:"Login Message",summary:"Login Successfully",duration:4000});
            }
            else if (data.message == 'Unsuccessful') {

              this.toast.error({detail:"Login Error Message",summary:"Incorrect Credentials",duration:4000});
              //alert(' Admin Please Enter valid credentials');
            }

          },
          (error: any) => console.log('this is the error' + error),
          () => console.log('Done Admin student in'),
        );
      }
      break;

    case 2:
      {
        //alert('This is the Officer talking');

        this.officerservice.loginOfficer(this.loginForm.value).pipe(first()).subscribe(
          data => {

            console.log("This is the message:"+data.message)
            if(data.message == 'Successful') {
              
              /* const redirect = this.officerservice.redirecturl ? this.officerservice.redirecturl : '/officer'; */
              this.router.navigate(['officer']);
              sessionStorage.setItem('officer_id',data.User_id);
              this.toast.success({detail:"Login Message",summary:"Login Successfully",duration:4000});
            }
            else if (data.message == 'Unsuccessful') {
              this.toast.error({detail:"Login Error Message",summary:"Incorrect Credentials",duration:4000});
              //alert('Officer Please valid credentials');
            }

          },
          (error: any) => console.log('this is the error' + error),
          () => console.log('Done login Officer in'),
        );

      }
      break;

      //student login part
    case 3:
      {
        //alert('This is the Student');
      
          this.userservice.loginUser(this.loginForm.value).pipe(first()).subscribe(
            data => {
          

              if (data.message == 'Successful')
              {
                /* const redirect = this.userservice.redirecturl ? this.userservice.redirecturl : '/qrcode'; */
                this.router.navigate(['qrcode']);
                sessionStorage.setItem('user_id',data.User_id);
                this.toast.success({detail:"Login Message",summary:"Login Successfully",duration:4000});
              }
              else if (data.message =='Unsuccessful')
              {
                this.toast.error({detail:"Login Error",summary:"Incorrect Credentials",duration:4000});
                //alert(' Student Please Enter valid credentials');
              }

            },
            (error: any) => console.log('this is the error' + error),
            () => console.log('Done login student in'),
          );
      }
      break;


    case 4:
      {
        //alert('This is the Visitor talking');
        this.visitorservice.loginVisitor(this.loginForm.value).pipe(first()).subscribe(
          data => {
        
            console.log(data);
            console.log(data.message);
            if (data.message == 'Successful')
            {
              /* const redirect = this.userservice.redirecturl ? this.userservice.redirecturl : '/qrcode'; */
              this.router.navigate(['qrcode']);
              sessionStorage.setItem('user_id',data.User_id);
              this.toast.success({detail:"Login Message",summary:"Login Successfully",duration:4000});
              sessionStorage.setItem("isVisitor",this.isVisitor)
            }
            else if (data.message =='Unsuccessful')
            {
              this.toast.error({detail:"Login Error",summary:"Incorrect Credentials",duration:4000});
              //alert(' Visitor Please Enter valid credentials');
            }

          },
          (error: any) => console.log('this is the error' + error),
          () => console.log('Done login Visitor in'),
        );
      }
      break;

    case 5:
      {
        alert('This is the staff talking');
        this.userservice.loginUser(this.loginForm.value).pipe(first()).subscribe(
          data => {
        

            if (data.message == 'Successful')
            {
              /* const redirect = this.userservice.redirecturl ? this.userservice.redirecturl : '/qrcode'; */
              this.router.navigate(['qrcode']);
              sessionStorage.setItem('user_id',data.User_id);
              this.toast.success({detail:"Login Message",summary:"Login Successfully",duration:4000});
            }
            else if (data.message =='Unsuccessful')
            {
              this.toast.error({detail:"Login Error",summary:"Incorrect Credentials",duration:4000});
              //alert(' Staff Please Enter valid credentials');
            }

          },
          (error: any) => console.log('this is the error' + error),
          () => console.log('Done login Staff in'),
        );
      }
      break;
  }
 

 }
usertype!:string;

 customFunction(option:any)
 {
   this.usertype="The value "+option+" was selected from the dropdown";
 }

  onSubmit()
  {

  }


  deletesession()
  {
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('admin_id')
    sessionStorage.removeItem('officer_id')
    sessionStorage.removeItem('isVisitor')
  }

}






//Commented snippets

//On submit

/* this.submitted=true;
   if(this.loginForm.valid)
   {
    //this.checkUser(this.user_type);
    // console.log('The user who jus t logged in,is a ')
     //alert('form submitted successfully');
     //console.table(this.loginForm.value);
   } */


//user data


            //console.log(data);

/* console.log("Is the user logged in "+this.userservice.isLoggedIn()); */
/* if(this.userservice.isLoggedIn())
{
  this.router.navigate(['qrcode']);
} */
/* if(data.message=='success')//No auth guard
{
  this.router.navigate(['qrcode']);
  console.log(data.message);
  //this.router.navigate(['qrcode']);
} */

    //console.log(data);

/* console.log("Is the user logged in "+this.userservice.isLoggedIn()); */
/* if(this.userservice.isLoggedIn())
{
  this.router.navigate(['qrcode']);
} */
/* if(data.message=='success')//No auth guard
{
  this.router.navigate(['qrcode']);
  console.log(data.message);
  //this.router.navigate(['qrcode']);
} */




//For checking user type did not work

 //Testing

  //typeName!: string;

/*

checkUser():void
 {
 
   for (let outer = 0; outer < this.users.length;outer++)
   {
     /* this.typeName =usertype[outer]; */
     
     /* if(this.typeName==="Officer")
      {
          this.officerservice.loginOfficer(this.loginForm.value).subscribe
          (
            (response) => {
             console.log(response)
               const officer = response;
               console.log(officer)
               this.router.navigate(['officer'])
               console.log('Logged as Officer');
             },
             (error: any) => console.log('this is the error' + error),
             () => console.log('Done login officer in'),
           );

      }
     else */ 
   /*   if (this.users[outer].id===3)
    {
       {
         this.userservice.loginUser(this.loginForm.value).pipe(first()).subscribe(
             data=>
             { */
               //console.log(data);

               /* console.log("Is the user logged in "+this.userservice.isLoggedIn()); */
               /* if(this.userservice.isLoggedIn())
               {
                 this.router.navigate(['qrcode']);
               } */
               /* if(data.message=='success')//No auth guard
               {
                 this.router.navigate(['qrcode']);
                 console.log(data.message);
                 //this.router.navigate(['qrcode']);
               } */

/*              if (data.message == 'success')
               {
                 const redirect = this.userservice.redirecturl ? this.userservice.redirecturl : '/qrcode';
                 this.router.navigate([redirect]);
               }
                
             },
             (error: any) => console.log('this is the error' + error),
             () => console.log('Done login student in'),
           );

       }
    }
  
  }
 }


*/ 

/*  checkUser(usertype:string[])
{
 
 for (let outer = 0; outer < usertype.length;outer++)
 {
   this.typeName=this.user_type[outer];
   
   switch(this.typeName)
   {

     case "Admin":
       {
         //console.log('Login as admin');
       }
       break;

     case "Officer":
       {
         this.officerservice.loginOfficer(this.loginForm.value).subscribe
         (
           (response) => {
             console.log(response)
             const officer = response;
             console.log(officer)
             this.router.navigate(['officer'])
             console.log('Logged as Officer');
           },
           (error: any) => console.log('this is the error' + error),
           () => console.log('Done login officer in'),
         );

       }
       break;

     case "Guest":
       {
         //console.log('Login as Guest');
       }
       break;

     case "Staff":
       {
         //console.log('Login as Staff');
       }
       break;

     case "Student":
       {
         this.userservice.loginUser(this.loginForm.value).subscribe
           (
             (response) => {
               console.log(response)
               const userinfo = response;
               console.log(userinfo)
               this.router.navigate(['qrcode'])
               console.log('Logged as student');
             },
             (error: any) => console.log('this is the error' + error),
             () => console.log('Done login student in'),
           );
          
       }
       break;
     default:
     {
       
     }
  
   }
 }
 
} */