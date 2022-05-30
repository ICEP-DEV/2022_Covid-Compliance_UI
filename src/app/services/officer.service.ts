import { Officer, OfficerLogin, UpdateOfficer } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {


  redirecturl!: string;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  //private apiUrl=environment.apiUrl;

  constructor(private http: HttpClient/*injection of the services*/) { }
  private apiUrl=environment.apiUrl;
  
  loginOfficer(user: OfficerLogin) {
    return this.http.post<OfficerLogin>(`${this.apiUrl}/login_officer/officer`, {
      User_id: user.User_id, Password: user.Password
    }).pipe(
      map((Officers) => 
      {
        //console.log(Officers);
       // this.setToken(Officers.User_id);
        //this.getLoggedInName.emit(true);
        //console.log('Following is Token');
        //console.log("User id is "+Users.User_id);
        //console.log(Users.User_id);
        //console.log(Users.Password);
        // localStorage.setItem('token',token.token);
        return Officers;
      })
    )
    /* return this.http.post(`${this.apiUrl}/login/user`,user); */
  }

  
  getOfficerProfile(id: string): Observable<Officer[]> {
    return this.http.get<Officer[]>(`${this.apiUrl}/retrieve_officer/user/`+ id)
  }


  updateofficerInfo(officerdata:UpdateOfficer):Observable<UpdateOfficer[] >
  {
      {
      return this.http.put<UpdateOfficer[]>(`${this.apiUrl}/update_officer/officer/${officerdata.Officer_id}`,officerdata);
    }
  }


  getOfficer(username:string):Observable<Officer>
  {
    return this.http.get<Officer>(`${this.apiUrl}/view_user/user/${username}`)
  }

 /*  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  /*  getToken() {
     localStorage.getItem('token');
   } 
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  } */

  isLoggedIn()
  {
    return sessionStorage.getItem('officer_id')!=null;
  }

}
