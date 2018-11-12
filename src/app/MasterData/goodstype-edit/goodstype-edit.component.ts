import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-goodstype-edit',
  templateUrl: './goodstype-edit.component.html',
  styleUrls: ['./goodstype-edit.component.css']
})
export class GoodstypeEditComponent implements OnInit {
  @Input() Inputdata;
  @Output() close:EventEmitter <any> = new EventEmitter();
  inputobject:any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Inputdata']) {
      this.inputobject=this.Inputdata;
  
  
  }
  // console.log(this.inputobject);
  }
}
