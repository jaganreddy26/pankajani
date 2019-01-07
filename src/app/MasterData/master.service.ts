import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../shared/service/app.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  BusinessId:any =localStorage.getItem('businessId');
  private host = environment.API_END_POINT;
  //url
  private url: string = '';
  constructor(private http: HttpClient) { }
  
  getCompanyId(data:any){
    this.url = this.host+'/api/UbtApi/GetCustomers';
    return this.http.post(this.url,data)
  }
  // GetCustomers
  getCustomers(data){
    this.url = this.host+'/api/UbtApi/GetCustomers';
    return this.http.post(this.url,data)
  }
  // SAVING BANK INFORMATION
  saveBankDetails(data){
    this.url = this.host+'/api/MasterDataApi/SaveBankDetails';
    return this.http.post(this.url,data)
  }
  // Get all BankDetails
  getAllBankDetails(data){
    this.url = this.host+'/api/MasterDataApi/GetBankDetails';
    return this.http.post(this.url,data)
  }
  //get bank Details by AccountNumber
  getBankDetailsbyACCNO(data){
    this.url = this.host+'/api/MasterDataApi/GetBankDetails';
    return this.http.post(this.url,data)
  }
//Update Bank Details
upadteBankDetails(data){
  this.url = this.host+'/api/MasterDataApi/UpdateBankDetails';
  return this.http.post(this.url,data)
}
//get BusinessId in Plant Details
getBusinessIdForPlantDetails(){
  this.url = this.host+'/api/UbtAPI/GetBusinessName';
     return this.http.get(this.url)
}
  //getBusinessId
  getBusinessId(){
    this.url = this.host+'/api/DefaultApi/GetBusinessName';
     return this.http.get(this.url)
  }
  // SAVING PLANT INFORMATION
  savePlantDetails(data){
    this.url = this.host+'/api/MasterDataApi/SavePlantDetails';
    return this.http.post(this.url,data)
  }
  //Get All PlantDetails
  getAllPlantDetails(data){
    this.url = this.host+'/api/MasterDataApi/GetPlantDetails';
    return this.http.post(this.url,data)
  }
  //Get by PlantDetails PlantId
getPlantDetailsByPlantId(data){
  this.url = this.host+'/api/MasterDataApi/GetPlantDetails';
  return this.http.post(this.url,data)
}
//Update Plant Details
updatePlantDetails(data){
  this.url = this.host+'/api/MasterDataApi/UpdatePlantDetails';
  return this.http.post(this.url,data)
}
  // Get Business Id for adding the Business
  getBusinessIds(){
    this.url = this.host+'/api/MasterDataApi/GetBusinessId';
    return this.http.get(this.url)
  }
  getBusiness_Ids(data){
    this.url = this.host+'/api/MasterDataApi/GetBusiness';
    return this.http.post(this.url,data)
  }
  //Get Status for adding the Business
  getStatus(){
    this.url = this.host+'/api/MasterDataApi/GetActiveStatus';
    return this.http.get(this.url)
  }
  // Saveing the BusinessId
  SaveBusiness(data){
    this.url = this.host+'/api/MasterDataApi/SaveBusiness';
    return this.http.post(this.url,data)
  }
  //GetBusiness
  getAllBusinesses(data){
    this.url = this.host+'/api/MasterDataApi/GetBusiness';
    return this.http.post(this.url,data)
  }
  //GetBusiness by id
  getBusinessDetailsById(data){
    this.url = this.host+'/api/MasterDataApi/GetBusiness';
    return this.http.post(this.url,data)
  }
  //UpdateBusineesDetails
  UpdateBusinessDetail(data){
    this.url = this.host+'/api/MasterDataApi/UpdateBusiness';
    return this.http.post(this.url,data)
  }
  //Save the CompanyDetails
  saveComapnyDetails(data){
    this.url = this.host+'/api/MasterDataApi/SaveCompanyDetails';
    return this.http.post(this.url,data)
  }
  //GetCompanyDetails 
  getcompanyDetails(data){
    this.url = this.host+'/api/MasterDataApi/GetCompanyDetails';
    return this.http.post(this.url,data)
  }
  //GetCompanyDetails By companyId
  getCompanyDetailsByid(data){
    this.url = this.host+'/api/MasterDataApi/GetCompanyDetails';
    return this.http.post(this.url,data)
  }
  //Update Company Details Api 
  UpdateCompanyDetails(data){
    this.url = this.host+'/api/MasterDataApi/UpdateCompanyDetails';
    return this.http.post(this.url,data)
  }
/////////////////// AREA Of Busines Api //////////////////

  //save area of business details
  saveAreaOfBusinessDetails(data){
    this.url = this.host+'/api/MasterDataApi/SaveBusinessAreaDetails';
    return this.http.post(this.url,data)
  }
/// GetBusinessAreaDetails
getAreaBusinessDetails(data){
  this.url = this.host+'/api/MasterDataApi/GetBusinessAreaDetails';
    return this.http.post(this.url,data)
}
//upadteBusiness Area Details by
updateAreaOfBusinessDetails(data){
  this.url = this.host+'/api/MasterDataApi/UpdateBusinessAreaDetails';
  return this.http.post(this.url,data)
} 
/////////////////// VENDOR DETAILS //////////////////

//save saveVendor Details 
saveVendorDetails(data){
  this.url = this.host+'/api/MasterDataApi/SaveVendorDetails';
  return this.http.post(this.url,data)
}
//Get All Vendor Details
getVendorDetails(data){
  this.url = this.host+'/api/MasterDataApi/GetVendorDetails';
  return this.http.post(this.url,data)
} 
//Get Perticular Vendor Details
getVendorDetailsByVendorId(data){
  this.url = this.host+'/api/MasterDataApi/GetVendorDetails';
  return this.http.post(this.url,data)
}
//upadte Vendor Details
updateVendorDetails(data){
  this.url = this.host+'/api/MasterDataApi/UpdateVendorDetails';
  return this.http.post(this.url,data)
}

///////////////////// AGENCY  /////////////////////

// SaveAgencyDetails
saveAgencyDetails(data){
  this.url = this.host+'/api/MasterDataApi/SaveAgencyDetails';
  return this.http.post(this.url,data)
}
// GetAgencyDetailsAll
getAgencyDetailsAll(data){
  this.url = this.host+'/api/MasterDataApi/GetAgencyDetails';
  return this.http.post(this.url,data)
} 
// GetAgencyDetails by AgencyId
getAgencyDetailsByAgencyId(data){
  this.url = this.host+'/api/MasterDataApi/GetAgencyDetails';
  return this.http.post(this.url,data)
}
// UpdateAgencyDetails
updateAgencyDetails(data){
  this.url = this.host+'/api/MasterDataApi/UpdateAgencyDetails';
  return this.http.post(this.url,data)
}
/////////////////// GOODS TYPE  //////////////////

// SaveGoodsTypeDetails
saveGoodsTypeDetails(data){
  this.url = this.host+'/api/MasterDataApi/SaveGoodsTypeDetails';
  return this.http.post(this.url,data)
}
// GetGoodsTypeDetails
getGoodsTypeDetails(data){
  this.url = this.host+'/api/MasterDataApi/GetGoodsTypeDetails';
  return this.http.post(this.url,data)
}
// GetGoodsTypeDetails By Id
getGoodsTypeDetailsById(data){
  this.url = this.host+'/api/MasterDataApi/GetGoodsTypeDetails';
  return this.http.post(this.url,data)
}
// UpdateGoodsTypeDetails
updateGoodsTypeDetails(data){
  this.url = this.host+'/api/MasterDataApi/UpdateGoodsTypeDetails';
  return this.http.post(this.url,data)
}
///////////// Add CATRGORY /////////////////
// GetGoodsType
getGoodsType(data){
  this.url = this.host+'/api/MasterDataApi/GetGoodsType';
  return this.http.post(this.url,data)
}
// SaveCategoryDetails
 saveCategoryDetails(data){
  this.url = this.host+'/api/MasterDataApi/SaveCategoryDetails';
  return this.http.post(this.url,data)
 }
 // GetCategoryDetails
 getCategoryDetails(data){
  this.url = this.host+'/api/MasterDataApi/GetCategoryDetails';
  return this.http.post(this.url,data)
 }
  // GetCategoryDetails By CategoryId
  getCategoryDetailsByCategoryId(data){
    this.url = this.host+'/api/MasterDataApi/GetCategoryDetails';
  return this.http.post(this.url,data)
  }
  // UpdateCategoryDetails:
  updateCategoryDetails(data){
    this.url = this.host+'/api/MasterDataApi/UpdateCategoryDetails';
    return this.http.post(this.url,data) 
  }
  ///////////// TAX /////////////////

  //DropdownFor GoodsID
  getGoodsTypeID(data){
    this.url = this.host+'/api/MasterDataApi/GetGoodsType';
    return this.http.post(this.url,data) 
  }
  //SavingAPI
  saveGoodsDetails(data){
    this.url = this.host+'/api/MasterDataApi/SaveGoodsDetails';
    return this.http.post(this.url,data) 
  }
  //saved GoodsDetails 
  getaddedGoodsDetails(data){
    this.url = this.host+'/api/MasterDataApi/GetGoodsTaxDetails';
    return this.http.post(this.url,data)  
  }
  //GoodsDetailsBy ID
  getGoodsDetailsById(data){
    this.url = this.host+'/api/MasterDataApi/GetGoodsTaxDetails';
    return this.http.post(this.url,data)  
  }
  //upading API
  UpdateTAXGoodsDetails(data){
    this.url = this.host+'/api/MasterDataApi/SaveGoodsDetails';
    return this.http.post(this.url,data) 
  }
  //////    CancellationReasonDetails      //////
  //SaveCancellationReasonDetails
  SaveCancellationReasonDetails(data){
    this.url=this.host+'/api/MasterDataApi/SaveCancellationReasonDetails';
    return this.http.post(this.url,data)
  }
  //GetCancellationReasonDetails
  GetCancellationReasonDetails(data){
    this.url=this.host+'/api/MasterDataApi/GetCancellationReasonDetails';
    return this.http.post(this.url,data)
  }
  //GetCancellationReasonDetailsBYID
  getCancellationReasonDetailsBYID(data){
    this.url=this.host+'/api/MasterDataApi/GetCancellationReasonDetails';
    return this.http.post(this.url,data)
  }
  //UpdateCancellationReasonDetails
  updateCancellationReasonDetails(data){
    this.url=this.host+'/api/MasterDataApi/SaveCancellationReasonDetails';
    return this.http.post(this.url,data)
  }




  ////// PaymentReasonDetails /////////
  //savePaymentReasonDetails
  savePaymentReasonDetails(data){
    this.url=this.host+'/api/MasterDataApi/SavePaymentReasonDetails';
    return this.http.post(this.url,data)
  }
  //GetPaymentReasonDetails:
  getPaymentReasonDetails(data){
    this.url=this.host+'/api/MasterDataApi/GetPaymentReasonDetails';
    return this.http.post(this.url,data)
  }
   //GetPaymentReasonDetailsByID:
   GetPaymentReasonDetailsBYID(data){
    this.url=this.host+'/api/MasterDataApi/GetPaymentReasonDetails';
    return this.http.post(this.url,data)
  }
  //UpdatePaymentReasonDetails
   UpdatePaymentReasonDetails(data){
    this.url=this.host+'/api/MasterDataApi/SavePaymentReasonDetails';
    return this.http.post(this.url,data)
   }
}
