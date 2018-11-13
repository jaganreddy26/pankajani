import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges} from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';

@Component({
  selector: 'app-categoryedit',
  templateUrl: './categoryedit.component.html',
  styleUrls: ['./categoryedit.component.css']
})
export class CategoryeditComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  categoryDetails:any={};
  Status:any=[];
  GoodsTypeIds:any=[];
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  updateRecords(){
    console.log(this.categoryDetails);
    this.masterService.updateCategoryDetails(this.categoryDetails).subscribe((data:any)=>{
      console.log(data);
      if(data !== 'null'){

        this.alertService.alert(AlertType.Success, data)
      }else{
        this.alertService.alert(AlertType.Error,"Something went wrong");
      }
    })
    this.Onclose();
      }
      Onclose(){
        this.close.emit();
      }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
     let obj={
      "CategoryId": this.Inputdata
      }
     // console.log(obj);
     this.masterService.getCategoryDetailsByCategoryId(obj).subscribe((data:any)=>{
       console.log(data);
       this.categoryDetails=data[0];
     })
     this.masterService.getStatus().subscribe((data:any)=>{
      console.log(data);
      this.Status=data;
    })
    let inputGoodsType={
      "CompanyId":localStorage.getItem('businessId')
    }
    this.masterService.getGoodsType(inputGoodsType).subscribe((data:any)=>{
      console.log(data);
      this.GoodsTypeIds=data;
    })
  }
  
  }
  onchangeStatus($event) {
    if ($event == 'true') {
      this.categoryDetails.Status = 1;
    }
    else {
      this.categoryDetails.Status = 0;
    }
  }
  onchangeGoodsType($event){
    this.categoryDetails.GoodsType=$event;
  }
}
