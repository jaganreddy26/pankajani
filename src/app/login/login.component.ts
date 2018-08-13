import { Component, OnInit } from '@angular/core';
import { LogiinInService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  business:any=[];
  constructor(private logiinInService:LogiinInService) { 
    this.getBusines();
  }

  ngOnInit() {
   
    // this.logiinInService.getBusinessName().subscribe((data:any)=>{
    
    // })
  }
getBusines(){
  this.logiinInService.getBusinessName().subscribe((data: any) => {
    this.business = data;
    console.log(data)
  })
}
login(data){
  this.logiinInService.login(data).subscribe((data:any)=>{
    console.log(data)
  })
}
}
