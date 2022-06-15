import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void
  {
    this.deletesession();
  }


  deletesession()
  {
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('Form_check');
    sessionStorage.removeItem('buttoncheck');
    /* this.router.navigate(['/login']); */
  }
}
