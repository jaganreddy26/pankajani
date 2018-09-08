import { Component, OnInit, TemplateRef ,ViewChild} from '@angular/core';
import { UbtService } from '../ubt.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';



@Component({
  selector: 'app-viewubt',
  templateUrl: './viewubt.component.html',
  styleUrls: ['./viewubt.component.css']
})
export class ViewubtComponent implements OnInit {
  status:any=[];
  StatusName:any;
  customer: any = []
  Id: any;
  FromDate: any = new Date();
  ToDate: any = new Date();
  businessId: any;
  customerId: any;
  ids: any = [];
  utbid: any;
  value: any;
  fromDateChanged: boolean = false;
  toDateChanged: boolean = false;
  editDetails:boolean = false;
  udtData:any = [];
  nodes:any=[];
  options: ITreeOptions = {
    displayField: 'Name',
    isExpandedField: 'expanded',
    idField: 'Id',
    hasChildrenField: 'nodes',
    
  }
  constructor(private ubtService: UbtService) {
    this.getCustomer();
  }

  ngOnInit() {
    let object = {
      ObjectType: 'UBT' 
    };
    this.ubtService.GetStatus(object).subscribe((data:any )=>{
      this.status = data;
    })
  }
  getCustomer() {
    this.ubtService.getCustomerName().subscribe((data: any) => {
      /// console.log(data);
      this.customer = data;
    })
  }
  search() {
    this.editDetails = false;
    this.businessId = this.ubtService.BusinessId;
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
      'Status':this.StatusName
    }
    this.ubtService.getViewUbtDetails(object).subscribe((data: any) => {
      this.ids = data;
      console.log(data);
      let all:any=[]
      let parent:any=[]
      let children:any=[];
      console.log(this.ids)
      this.ids.forEach(element => {
        // element.TCategory.forEach(element1 => {
        // children.push({'Id':element1.Id,'Name':element1.Name,'GoodsType':element1.GoodsTypes,'UbtId':element1.UbtId,'children':element1.TProposal})
        // })
        parent.push({'Id':element.UbtId,'Name':element.UbtId,'children':element.TCategory})
      });
    
    //step 4 for Tree struture here the tree struture we form in the HTML
      this.nodes = parent;
      // parent.forEach(element => {
      //   element.children.forEach(element1 => {
      //   this.nodes.push(element1)
      //   });
      // });
    // this.nodes.forEach(element => {
    //   element.children.forEach(element1 => {
    //     element.children.push({'Id':element.Id,'Name':element.Name,'children':element.TProposal})
    //   });
    // });
    // console.log(children)
      // this.nodes.prototy
      // console.log(this.nodes)

    // })
     //step 3 for Tree struture
     this.ids.forEach(element => {
      parent.push({'Id':element.UbtId,'Name':element.UbtId,'children':element.TCategory})
    });
  
  //step 4 for Tree struture here the tree struture we form in the HTML
    this.nodes = parent;

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
  // edit(item) {
  //   this.editDetails = true;
  //   var id = item.UbtId
  //   console.log(id)
  //   let ubtId = { 'UbtId': id }

  //   this.ubtService.getIndividualUbt(ubtId).subscribe((data: any) => {
  //    this.udtData = data;
  //    console.log(this.udtData)
  //   })
  // }
  onActivate($event){   
    console.log($event.node.data)
    let obj ={
      'UbtId': $event.node.data.Id,
    }
    console.log(obj);
    this.ubtService.getIndividualUbt(obj).subscribe((data:any)=>{
      if(data.length != 0){
        this.editDetails = true;
        this.udtData = data;
        console.log(this.udtData)
      }
      // else{
      //   this.editDetails = false;
      // }
    }
  )

            
      let object = { 
        'UbtId': $event.node.data.UbtId,
        'CustomerId':this.customerId,
        "GoodsType":$event.node.data.GoodsTypes,
        "CategoryId":$event.node.data.Id
       }
       console.log(object);
          this.ubtService.getIndividualUBTCategoryDetails(object).subscribe((data: any) => {
            if(data.length != 0){
              this.editDetails = true;
              this.udtData = data;
              console.log(this.udtData)
            }
            // else{
            //   this.editDetails = false;
            // }
          
          })
//     if($event.node.data.children){

//     }
//     else{
//       this.editDetails = true;
//       let object = { 
//         'UbtId': $event.node.data.parent.UbtId,
//         'CustomerId':this.customerId,
//         "GoodsType":$event.node.parent.data.GoodsTypes,
//         "CategoryId":$event.node.parent.data.Id
//        }
//        console.log(object);
//           this.ubtService.getIndividualUBTCategoryDetails(object).subscribe((data: any) => {
//            this.udtData = data;
//            console.log(this.udtData)
//           })

//         }
}
}