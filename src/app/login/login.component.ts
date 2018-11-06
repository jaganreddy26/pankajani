import { Component, OnInit } from '@angular/core';
import { LogiinInService } from './login.service';
import { AppService } from '../shared/service/app.service';
import { AlertService } from '../shared/alerts/_services/alert.service';
import { AlertType } from '../shared/alerts/_models/alert';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  business:any=[];
  username:string;
  passwrod:string;
  businessId:any;
  constructor(private logiinInService:LogiinInService,private appService:AppService,private alertService:AlertService) { 
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
  if(this.businessId){
    this.logiinInService.login(this.username,this.passwrod).subscribe((data:any)=>{
      console.log(data)
      localStorage.setItem('access_token',data.access_token)
      localStorage.setItem('businessId',this.businessId)
      this.appService.navigate('/home',{})
    })
  }else{
    this.alertService.alert(AlertType.Error,"Please Select Bussines Name");
  }
  
}
}
