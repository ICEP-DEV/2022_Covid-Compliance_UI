import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ContactusService } from 'src/app/services/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit
{
/* 
  id!: number;
  fullname!: String;
  email!: string;
  message!: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  */

   constructor(
     private toast:NgToastService,
    private router:Router,private contactusservice:ContactusService){}
 
  contactForm!:FormGroup;
  ngOnInit(): void {

    this.contactForm=new FormGroup
    (
      {
        User_id:new FormControl(''),
        fullname:new FormControl(''),
        message:new FormControl(''),
        email:new FormControl('',[Validators.required, Validators.email]),
      }
    )

    this.deletesession();
  }


  get User_id()
  {
    return this.contactForm.get('User_id');
  }

  get fullname()
  {
    return this.contactForm.get('fullname');
  }

  get message()
  {
    return this.contactForm.get('message');
  }

  get email()
  {
    return this.contactForm.get('email');
  }


   onSendEmail()
   {
     this.contactusservice.sentEmail(this.contactForm.value).subscribe(
       contact=>
       {
         console.log(contact);
         //this.toast.success({detail:"Contact Us",summary:"Message Sent",duration:4000})
        
         //this.contactForm.reset();//this.router.navigate(['/contactus'])
       }
     )
   }
   submitForm()
  {
    if(this.contactForm.valid)
    {
      this.onSendEmail();
      this.contactForm.reset();
      this.toast.success({detail:"Contact Us",summary:"Email Sent",duration:4000})
      //alert('Submitted Successful');
    }
  }



  deletesession()
  {
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('Form_check');
    sessionStorage.removeItem('buttoncheck');
    
  }

}
