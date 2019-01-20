import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
@Component({
  selector: 'app-goodstype-edit',
  templateUrl: './goodstype-edit.component.html',
  styleUrls: ['./goodstype-edit.component.css']
})
export class GoodstypeEditComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputobject:any;
  goodsTypeDetails:any={};
  Status:any=[];
  value:any;
  constructor(private masterService:MasterService,private alertService :AlertService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputobject=this.Inputdata;
  
  this.masterService.getGoodsTypeDetailsById(this.inputobject).subscribe((data:any)=>{
    console.log(data);
    this.goodsTypeDetails=data[0];
  })
  this.masterService.getStatus().subscribe((data:any)=>{
    //console.log(data);
    this.Status=data;
  })
  }

  }

  updateRecords(){
    this.masterService.updateGoodsTypeDetails(this.goodsTypeDetails).subscribe((data:any)=>{
      if(data !== 'null'){

        this.alertService.alert(AlertType.Success, data)
        this.Onclose();
      }else{
        this.alertService.alert(AlertType.Error,"Something went wrong");
        this.Onclose();
      }
    })
   
  }
  Onclose(){
    this.close.emit();
  }
  onchangeStatus($event){
    if($event=='Active')
    this.goodsTypeDetails.Status=1;

  else
    this.goodsTypeDetails.Status=0;
    console.log(this.goodsTypeDetails.Status);
  }

}
