import { Component, OnInit } from '@angular/core';
import {addAgency} from '../../shared/entities/addAgency';
import {MasterService} from '../master.service';
import { AlertService } from '../../shared/alerts/_services/alert.service';
import { AlertType } from '../../shared/alerts/_models/alert';
import { MatDialog } from "@angular/material";
@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  agency:addAgency = new addAgency();
  InputId:any;
  constructor(private masterService:MasterService,private alertService :AlertService,private dialog: MatDialog) { }

  ngOnInit() {
  }
  // openModalEdit(items, template) {
  //   this.dialog.open(template);
  //   // this.modalRef = this.modalService.show(template);
  //   // console.log(items.CompanyId)
  //   this.InputId = items.PlantId;
  // }
}
