import { Component, OnInit } from '@angular/core';
import {ProposalServiceService} from '../proposal.service';

@Component({
  selector: 'app-seekproposal',
  templateUrl: './seekproposal.component.html',
  styleUrls: ['./seekproposal.component.css']
})
export class SeekproposalComponent implements OnInit {
  customer: any = []
  Id: any;
  FromDate: any = new Date();
  ToDate: any = new Date();
  businessId: any;
  customerId: any;
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  ids: any = [];
  nodes:any=[];
 
  options = {};
  constructor(private proposalService: ProposalServiceService) {
    this.getCustomer();
   }

  ngOnInit() {
  }
  getCustomer() {
    this.proposalService.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    })
  }

  
  search() {

    this.businessId = this.proposalService.BusinessId;
    this.customerId = this.Id;
    //console.log(this.customerId);
    if (this.fromDateChanged == false) {
      this.FromDate.toLocaleDateString();
      var fromdate = this.FromDate.getFullYear() + '-' + (this.FromDate.getMonth() + 1) + '-' + this.FromDate.getDate();
      this.FromDate = fromdate;
      this.fromDateChanged = true
    }
    if (this.toDateChanged == false) {
      this.ToDate.toLocaleDateString();
      var todate = this.ToDate.getFullYear() + '-' + (this.ToDate.getMonth() + 1) + '-' + this.ToDate.getDate();
      this.ToDate = todate;
      this.toDateChanged =true;
    }
    let object = {
      'BusinessId': this.businessId,
      'CustomerId': this.customerId,
      'FromDate': this.FromDate,
      'ToDate': this.ToDate,

    }
    this.proposalService.getUbtIds(object).subscribe((data: any) => {
      this.ids = data;
      let all:any=[]
      this.ids.forEach(element => {
        element.TCategory.forEach(element2 => {
          let children:any=[];
          children.push({'id':element2.CategoryId,'name':element2.CategoryName,'GoodsTypes':element2.GoodsTypes,'UbtId':element2.UbtId})
          all.push({'id':element.UbtId,'name':element.UbtId,'children':children})
        });        
      
      });
    
      // this.nodes = [
      //   {
      //     id: 1,
      //     name: 'root1',
      //     children: [
      //       { id: 2, name: 'child1' },
      //       { id: 3, name: 'child2' }
      //     ]
      //   }
      // ];
      this.nodes = all;

    })

  }
  onchange($event) {
    this.Id = $event
  }
  fromDateChange() {
    this.fromDateChanged = true;
    this.FromDate.toLocaleDateString();
    var fromdate = this.FromDate.getFullYear() + '-' + (this.FromDate.getMonth() + 1) + '-' + this.FromDate.getDate();
    this.FromDate = fromdate;

  }
  toDateChange() {
    this.toDateChanged = true;
    this.ToDate.toLocaleDateString();
    var todate = this.ToDate.getFullYear() + '-' + (this.ToDate.getMonth() + 1) + '-' + this.ToDate.getDate();
    this.ToDate = todate;
  }
  onActivate($event){   
    if($event.node.data.children){

    }else{
      let obj = {
        'CategoryId': $event.node.data.id,
        'GoodsType':$event.node.data.GoodsTypes,
        'Status': 'Open',
        UbtId:$event.node.data.UbtId,

      }
      console.log(obj)
    }
  }
}
