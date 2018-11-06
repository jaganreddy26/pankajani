import { Component, OnInit } from '@angular/core';
import {MasterService} from '../master.service';
@Component({
  selector: 'app-areaof-business',
  templateUrl: './areaof-business.component.html',
  styleUrls: ['./areaof-business.component.css']
})
export class AreaofBusinessComponent implements OnInit {
  status:any=[];
  Name:any;
  ActiveStatus:any;
  constructor(private masterService:MasterService) {
    this.GetStatus();
   }

  ngOnInit() {
  }
  GetStatus() {
    this.masterService.getStatus().subscribe((data: any) => {
      this.status = data;
    })
  }
  Save(){
  // localStorage.getItem('businessId')
 let obj= {
    "CompanyId":localStorage.getItem('businessId'),
    "Name":this.Name,
    "Status":this.ActiveStatus,
    }
    console.log(obj);
  }
  onchangeStatus($event){
    //console.log($event);
    if($event=='true'){
      this.ActiveStatus=1;
    }
    else{
      this.ActiveStatus=0;
    }
  }
}
