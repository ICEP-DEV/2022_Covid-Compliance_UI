import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { FileToUpload } from '../interfaces/file-to-upload';
import { addImage, GetAllOfficers, GetAllRecords, getImage, getTheUser, getTheVisitor, Officer, UpdatePassword, updatetheUser, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 

  constructor(private http:HttpClient) { }

 /* postOfficer(data : Officer){
    return this.http.post<any>("${this.apiUrl}/create_officer/officer",{Officer_id:data.Officer_id,
    Last_name:data.Last_name,First_name:data.First_name,Campus_id:data.Campus_id,Email:data.Email,Password:data.Password,Cellphone_number:data.Campus_id,Gender:data.Gender}).pipe(
      map((Officers)=>{
        return Officers}));
  }*/

  private apiUrl=environment.apiUrl;

  postOfficer(data : any){
    return this.http.post<any>(`${this.apiUrl}/create_officer/officer`,data)
  }

  getOfficer():Observable<GetAllOfficers[]>{
    return this.http.get<GetAllOfficers[]>(`${this.apiUrl}/retrieve_all_officers/officer`);
  }
  putOfficer(officer_id:number):Observable<GetAllOfficers[]>{
    return this.http.put<GetAllOfficers[]>(`${this.apiUrl}/update_officer/officer/:Officer_id`,officer_id);
  }
  deleteOfficer(id:number):Observable<GetAllOfficers[]>{
    return this.http.delete<GetAllOfficers[]>(`${this.apiUrl}/delete_officer/officer/`+id);
  }

  getRecord():Observable<GetAllRecords[]>{
    return this.http.get<GetAllRecords[]>(`${this.apiUrl}/get_all_records/record`)
  }



//Marinkie Changes
  getImage(id: number): Observable<getImage> {
    return this.http.get<getImage>(`${this.apiUrl}/select_image/image/` + id);
  }

  postImage(fileToUpload:File): Observable<boolean>
  {
    const formData: FormData = new FormData();

    formData.append('image',fileToUpload, fileToUpload.name);
    return this.http.post<any>(`${this.apiUrl}/upload_image/image`,formData);
  
  }
 
  updateUser(User_id: number): Observable<updatetheUser[]> {
    return this.http.put<updatetheUser[]>(`${this.apiUrl}/update/user/`, User_id);
  }
  getUser(id: string): Observable<getTheUser[]> {
    return this.http.get<getTheUser[]>(`${this.apiUrl}/view_user/user/`+id)
  }
  getVisitor(id: string): Observable<getTheVisitor[]> {
    return this.http.get<getTheVisitor[]>(`${this.apiUrl}/select_visitor/visitor/`+id)
  }
   requestReset(body): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/resetpassword/req-reset-password`, body);
  }

  newPassword(body): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/resetpassword/new-password`, body);
  }

  ValidPasswordToken(body): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/resetpassword/valid-password-token`, body);
  }

  updatePassword(userEmail:string):Observable<UpdatePassword>{
    return this.http.put<UpdatePassword>(`${this.apiUrl}/reset_password/:email`,userEmail);
  }
  getoldUser(username:string):Observable<User>
  {
    return this.http.get<User>(`${this.apiUrl}/view_user/user/${username}`)
  }

}