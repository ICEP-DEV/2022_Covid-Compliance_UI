import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PendingRecord, Record } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http:HttpClient) { }

 
  /*getRecord():Observable<Record[]>
  {
    return this.http.get<Record[]>('http://localhost/phpmyadmin/index.php?route=/table/structure&db=covid_compliance&table=record');
  }*/
  /* getofficerRecord(){
    return this.http.get<any>("http://localhost:3000/get_all_records/record");
  } */
  
  getRecord():Observable<Record[]>
  {
    return this.http.get<Record[]>('http://localhost:3000/retrieve_entered_student/record');
  }
  getPendingRecord():Observable<PendingRecord[]>
  {
    return this.http.get<PendingRecord[]>('http://localhost:3000/retrieve_all_form/record');
  }
}
