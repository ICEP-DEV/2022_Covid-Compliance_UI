import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-officer',
  templateUrl: './add-officer.component.html',
  styleUrls: ['./add-officer.component.css']
})
export class AddOfficerComponent implements OnInit {
  officerForm !: FormGroup;
  actionBtn:string ='Save';
  lblType:string = 'Add Officer';
  passwType:string = 'Password';
  passwTypeConfirm = 'Confirm Password';
  constructor(
    private toast:NgToastService,
    private formBuilder: FormBuilder,
    private api:ApiService,
    private dialogRef : MatDialogRef<AddOfficerComponent>,
    //inject mat-dialog-data to get a single row array of data
    @Inject(MAT_DIALOG_DATA) public editData:any
    ) { }

  ngOnInit(): void {
    this.officerForm = this.formBuilder.group({
      Officer_id: ['', Validators.required],
      Campus_id: ['', Validators.required],
      First_name: ['', Validators.required],
      Last_name: ['', Validators.required],
      Gender: ['', Validators.required],
      Cellphone_number: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],

    });
    //check if row data is reflecting from the dialog then patch into dialof input fields
    //console.log(this.editData);

    if(this.editData){
      this.actionBtn = "Update";
      this.lblType = "Edit Officer";
      this.passwType="Old Password";
      this.passwTypeConfirm = "New Password";
        this.officerForm.controls['Officer_id'].setValue(this.editData.Officer_id);
        this.officerForm.controls['Campus_id'].setValue(this.editData.Campus_id);
        this.officerForm.controls['First_name'].setValue(this.editData.First_name);
        this.officerForm.controls['Last_name'].setValue(this.editData.Last_name);
        this.officerForm.controls['Gender'].setValue(this.editData.Gender);
        this.officerForm.controls['Cellphone_number'].setValue(this.editData.Cellphone_number);
        this.officerForm.controls['Email'].setValue(this.editData.Email);
        this.officerForm.controls['Password'].setValue(this.editData.Password);

        
    }

   
    const draft = sessionStorage.getItem("userEdits");
    if (draft)
    {
      this.officerForm.setValue(JSON.parse(draft));
    }
    this.officerForm.valueChanges.pipe()
      .subscribe( val =>
        { 
          sessionStorage.setItem("userEdits",JSON.stringify(val))
        });

  }
  addOfficer()
  {
   // console.log(this.officerForm.value);
   //if we not adding then we edit
   if(!this.editData){
    if(this.officerForm.valid)
    {this.ClearSessions();
      this.api.postOfficer(this.officerForm.value)
      .subscribe({
        next:(res:any)=>{
          this.toast.success({detail:"Add Officer",summary:"Officer Added",duration:3000})
          //alert('officer registered successfully');
          this.dialogRef.close('saved'); //close form once saved
          location.reload()
        },
        error:()=>{
         alert('Could not register officer ');
        }

      })
    }
   }else{
     this.updateOfficer()
   }

  }
  updateOfficer(){
this.api.putOfficer(this.officerForm.value)
.subscribe({
  next:(res)=>{
    //alert("Updated Officer Successfully");
    this.toast.success({detail:"Update Officer",summary:"Officer Details Updated",duration:3000})
    this.officerForm.reset();
    this.dialogRef.close('Updated');
  },error:()=>{
    //alert("Error while updating officer");
    this.toast.error({detail:"Update Officer",summary:"Could Not Updated \n Officer Details",duration:3000})
  }
})
  }


  ClearSessions()
  {
    sessionStorage.removeItem('userEdits')
  }



}