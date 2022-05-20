import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  constructor() { }

  qrImg:any
  ngOnInit()
  {
    this.generateQrCode();
  }

 

  generateQrCode()
  {
    console.log(sessionStorage.getItem('user_id'))
    if(!sessionStorage.getItem('user_id'))
      return;
      this.qrImg=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:4200/studentcard/${sessionStorage.getItem('user_id')}`
    
      
  }
}
