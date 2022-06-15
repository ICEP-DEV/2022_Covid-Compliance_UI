import { Component, OnInit } from '@angular/core';
import {Chart, registerables } from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';
import { ApiService } from 'src/app/services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { User,statsData, flueData, visitorData } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  displayedColumns: string[] = ['TotalStudents'];
  dataSource !: MatTableDataSource<any>;
  Chart:any=[];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private dialog: MatDialog,
    private statsServices: StatsService,
    
    private api2:ApiService,
    private api:StatsService,
    private router:Router
    ) { 
   Chart.register(...registerables);
    

  }


sum:any
totalStaff:any
speed:any;
totalnumberofVisitotsandusers:any;
  ngOnInit(): void
  {
      this.getStats();
      this.getflue();
      this.statsDiagrams();
      this.getvisitor();

       //this.sum= Number(sessionStorage.getItem('totalflue'))/(Number(sessionStorage.getItem('totalvisitors'))+Number(sessionStorage.getItem('totalstaff')))+Number(sessionStorage.getItem('totalflue'))

      

      

      /* Calculations */
      this.totalStaff=(Number(sessionStorage.getItem('totalvisitors'))+Number(sessionStorage.getItem('totalstaff')))
      sessionStorage.setItem('staff',this.totalStaff)

      this.sum=(Number(sessionStorage.getItem('totalflue'))/(this.totalStaff+Number(sessionStorage.getItem('totalflue'))))*100

      this.speed=1/0.71;

      this.speed=this.speed.toFixed(2);
      this.sum=this.sum.toFixed(2);
      //alert("total staff "+this.totalStaff)
      //alert('The infected is '+this.sum);
  
}
 

  //// total people
  users!:statsData[]
  getStats() {
    this.api.getStats()
    .subscribe({
      next:(res:any)=>{
        //console.log(res)
        this.users=res.data
      //  console.log(this.users[0].Students);
      sessionStorage.setItem('totalstaff',`${this.users[0].Students}`)
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
       // alert("Error while fetching record data");
        
      }
    })
  }
////total flue
userFlues!:flueData[]
getflue() {
  this.api.getFlue()
  .subscribe({
    next:(res:any)=>{
      //console.log(res)
      this.userFlues=res.data
      //console.log(this.userFlues[0].Total);
      sessionStorage.setItem('totalflue',`${this.userFlues[0].Total}`)
      
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error:()=>{
      //alert("Error while fetching record data");
      
    }
  })
}


//total visitors
visitors!:visitorData[]
getvisitor() {

  
  this.api.getVisitor().subscribe({
    next:(res:any)=>
    {
      //alert("Something")
      console.log(res)
      this.visitors=res.data
      console.log(this.visitors[0].Total);
     
      sessionStorage.setItem('totalvisitors',`${this.visitors[0].Total}`)
      //alert(`${this.visitors[0].Total}`)
      
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error:()=>{
      //alert("Error while fetching record data");
      
    }
  })
}

/////end

rateOfStaff:any;
  statsDiagrams()
  {
    this.Chart =new Chart('canvas',{
      type: 'bar',
      data: {
          labels: ['Students', 'Visitors', 'Total Users'],
          datasets: [{
              label: 'Total members',
              data: [sessionStorage.getItem('totalstaff'),sessionStorage.getItem('totalvisitors'),sessionStorage.getItem('staff')],
              backgroundColor: [
                'red',
                'blue',
                'orange'
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
               
            ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    })    
      
    
 

    this.rateOfStaff=Number(sessionStorage.getItem('totalstaff'))*this.speed



    this.Chart =new Chart('canvas2',{
      type: 'line',
      data: {
        
          labels: ['Visitors', 'Total Users', 'Students'],
          datasets: [{
           
              label: 'Spread of Flue..!!!',
              data: [this.rateOfStaff,sessionStorage.getItem('totalvisitors'),sessionStorage.getItem('staff'),5],
              fill: true,
              backgroundColor: 'green',
              borderColor: 'blue',
              pointBackgroundColor: 'red',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    })    
    
  }

 

  deletesession() {
    sessionStorage.removeItem('admin_id');
    this.router.navigate(['/login']);
  }
}



