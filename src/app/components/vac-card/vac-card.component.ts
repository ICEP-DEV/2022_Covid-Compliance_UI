import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vac-card',
  templateUrl: './vac-card.component.html',
  styleUrls: ['./vac-card.component.css']
})
export class VacCardComponent implements OnInit {

  constructor(private toast:NgToastService,private http:HttpClient) { }
  private apiUrl=environment.apiUrl;
  vacCard:any
  vaccinationCard:any;
  ngOnInit(): void
  {
    this.vaccinationCard=this.viewVaccCard(`${sessionStorage.getItem('user_id')}`);
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
}
