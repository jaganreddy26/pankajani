import { Component, OnInit,TemplateRef } from '@angular/core';
import { Plants } from '../../shared/entities/plants';


@Component({
  selector: 'app-plantdetails',
  templateUrl: './plantdetails.component.html',
  styleUrls: ['./plantdetails.component.css']
})
export class PlantdetailsComponent implements OnInit {
plant:Plants = new Plants();
  constructor() { 
  
  }

  ngOnInit() {
  }
  save(){
    console.log(this.plant)
  }
}
