import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Newsfeed } from '../interfaces/newsfeed';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private http:HttpClient) { }
  private apiUrl=environment.apiUrl;

  sentNewsFeed(newsfeed:Newsfeed)
  {
    return this.http.post<Newsfeed>(`${this.apiUrl}/insert_news/newsfeed`,newsfeed).pipe(
      map((comments)=>
      {
        console.log(comments);
        return comments;
      })
    )
  }
  getNewsFeed():Observable<Newsfeed>
  {
    return this.http.get<Newsfeed>(`${this.apiUrl}/select_news_feed/newsfeed`).pipe(
      map((comments)=>
      {
        console.log(comments);
        return comments;
      })
    )
  }

  deleteNewsFeed(id:number):Observable<Newsfeed[]>{
    return this.http.delete<Newsfeed[]>(`${this.apiUrl}/delete_news/delete_news_feed/`+id);
  }

}
