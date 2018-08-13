import { Component, OnInit } from '@angular/core';
import { LogiinInService } from './login.service';
import { AppService } from '../shared/service/app.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  business:any=[];
  username:string;
  passwrod:string;
  constructor(private logiinInService:LogiinInService,private appService:AppService) { 
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
login(){
  this.logiinInService.login(this.username,this.passwrod).subscribe((data:any)=>{
    console.log(data)
    localStorage.setItem('access_token',data.access_token)
    this.appService.navigate('/home',{})
  })
}
}
