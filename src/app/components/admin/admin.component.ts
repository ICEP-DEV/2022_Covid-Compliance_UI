import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ViewImage } from 'src/app/interfaces/file-to-upload';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(
    private toast:NgToastService,
    private http: HttpClient, private router: Router,
    private api: ApiService
  ) { }

  private apiUrl=environment.apiUrl;
  
  encapsulation!: ViewEncapsulation.None;

  ngOnInit(): void {
    this.onView();
  }
  ngAfterViewInit() {
    this.onView();
  }

  pic_path: any;
  name: string = "";

  getName(name: string) {
    this.name = name;
  }
  onFileSelected(event: any) {
    this.pic_path = event.target.files[0];
    //console.log('File '+this.pic_path)
    console.log(this.pic_path)
  }

  onUpload() {
    let formData = new FormData()
    formData.append('name', this.name)
    formData.append('pic_path', this.pic_path)
    //fd.append('pic_path',this.selectedFile,this.selectedFile.name);

    this.http.post(`${this.apiUrl}/upload_image/image`, formData).subscribe(
      res => {
        this.toast.success({detail:"Image",summary:"Image Uploaded",duration:3000})
        console.log(res)
        this.onView();
        window.location.reload()
      }
    )
   
    
  }

  pic: string = 'pic_path-1650626677588.png';
  images!: ViewImage[];

  
  onView() {
    this.http.get(`${this.apiUrl}/select_all_image/`).subscribe(
      (res: any) => {
        this.images = res.data
        /* console.log("This is the paths "+this.images[0].pic_path);
        console.log(this.images[0].pic_path); */
        //console.log(res)
      }
    );
  }

  displayedColumns: string[] = ['image_id', 'pictureName', 'pic_path'];
  dataSource !: MatTableDataSource<ViewImage>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletesession() {
    sessionStorage.removeItem('admin_id');
    this.router.navigate(['/login']);
  }

}