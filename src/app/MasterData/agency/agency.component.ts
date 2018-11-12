import { Component, OnInit } from '@angular/core';
import {addAgency} from '../../shared/entities/addAgency';
import {MasterService} from '../master.service';
@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  agency:addAgency = new addAgency();
  constructor(private masterService:MasterService) { }

  ngOnInit() {
  }

}
