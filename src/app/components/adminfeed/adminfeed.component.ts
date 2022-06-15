import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Newsfeed } from 'src/app/interfaces/newsfeed';
import { NewsfeedService } from 'src/app/services/newsfeed.service';

@Component({
  selector: 'app-adminfeed',
  templateUrl: './adminfeed.component.html',
  styleUrls: ['./adminfeed.component.css']
})
export class AdminfeedComponent implements OnInit {

  newsfeedform!: FormGroup
  
  constructor(private router:Router, private newsfeedservice:NewsfeedService,
    private toast:NgToastService) { }

  ngOnInit(): void{

    this.newsfeedform=new FormGroup
    (
      {
        Title:new FormControl(''),
        News:new FormControl('')
      }
    )

    //Call the newsFeed serviceFunction

    this.onGetNewsFeed();
  }


  get Title()
  {
    return this.newsfeedform.get('Title')
  }
  get News()
  {
    return this.newsfeedform.get('News')
  }



  onSendNewsFeed()
  {
    this.newsfeedservice.sentNewsFeed(this.newsfeedform.value).subscribe(
      res=>
      {
        //alert("News Feed sent");
        this.newsfeedform.reset();
       this.onGetNewsFeed();
        console.log(res);
      }
    )
  }

  deletesession() {
    sessionStorage.removeItem('admin_id');
    this.router.navigate(['/login']);
  }

  submitForm() {
    this.onSendNewsFeed();
   /*  alert('Submitted Successful'); */
  }


  //table

  displayedColumns: string[] = ['News_id','News', 'Title','Date', 'action'];
  dataSource !: MatTableDataSource<Newsfeed>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }




  onGetNewsFeed(): void 
  {
    this.newsfeedservice.getNewsFeed().subscribe(
      (news:any) => {
        //console.log(response)
        //this.pendingRecords = response.data;
       //console.log("This is the info from server "+response.data);
       //console.log(this.pendingRecords);

      console.log(news)
      this.dataSource = new MatTableDataSource(news.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      },
      (error: any) => console.log('this is the error' + error),
      () => console.log('Done getting record'),
    );
  }


  DeleteOfficer(id:number):void{
    this.newsfeedservice.deleteNewsFeed(id)
    .subscribe({
      next:(res)=>{
        console.log(res)
        //alert('NewsFeed  Deleted');
        this.toast.success({detail:"News Feed",summary:"Successfully Deleted",duration:4000});
        this.onGetNewsFeed()
      },error:()=>{
        //alert('Could not delete newsfeed');
      }
    }) 
    }
}
