import { Component, HostListener, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  businessId:any;
  constructor(public router: Router) {
  console.log(this.router.url)
  this.businessId = localStorage.getItem('businessId');
  console.log(this.businessId);
}
logout(){
localStorage.clear();
this.businessId="";
console.log(this.businessId);
}
}

