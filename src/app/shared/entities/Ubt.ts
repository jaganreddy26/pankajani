//Used in create ubt page to add row
export class UbtAddRow{
    GoodsType:string;
    CategoryId:number;
    CategoryName:string;
    Quantity:number;
    BasePrice:number;
    MaxMargin:number;
}


//Used in confirm bidding page to add row
export class UbtConfirmBiddingAddRow{
    GoodsType:string;
    CategoryId:number;
    CategoryName:string;
    Quantity:number;
    BasePrice:number;
    MaxMargin:number;
    BiddingQty:number;
    BiddingPrice:number;
}

//Used to save create ubt
export class CreateUbt{
    UbtId:string;
    BusinessId:number;
    CustomerId:number;
    CategoryId:string;
    AgencyId:number;
    FileItem?:File;
}

//Used in view ubt seach parameter
export class UbtRange{
    BusinessId:number;
    CustomerId:number;
    FromDate?:Date;
    ToDate?:Date;
    Status:string;
}

//Used to display ubt
export class Ubt{
    CustomerId:number;
    CustomerName:string;
    UbtId:string;
    CategoryId:number;
    CategoryName:string;
    AgencyName:string;
    GoodsType:string;    
    Quantity:number;
    BasePrice:number; // added for po
    MaxMargin:number;
    BiddingQty:number;
    BiddingPrice:number;
}



//Used to display individual ubt
export class IndividualUbt{
    GoodsType:string; 
    CategoryId:number;
    CategoryName:string;
    ProposalId:number;
    ProposalName:string;
    ProposalStatus:string;
    POId:number;
    POStatus:string;
    PermissionId:number;
    PermissionStatus:string;
    WorkOrderId:number;
    WOStatus:string;
    UbtId:string;
    UbtStatus:string;
}

//Used to display individual ubt details
export class IndividualUbtDetails{
    CustomerId:number;
    CustomerName:string;
    CategoryId:number;
    CategoryName:string;
    GoodsType:string;
    AgencyId:number;
    AgencyName:string;
    Quantity:number;
    BasePrice:number;
    MaxMargin:number;
    BiddingQty:number;
    BiddingPrice:number;
    ConfirmBidding:string;
    BiddingDocumentPath:string;
}

//Used to close an ubt
export class ChangeStatus{
    ObjectType:string;
    Id:string;
    Status:string;
}

//used to get status
export class Status{
    StatusName: string;
}

//used to send parameters like UBT,PRO,PO,WO
export class ObjectTypeParam{
    ObjectType:string;
}

//used to get transporter,loading contractor,unloading contractor
export class Vendor{
    VendorId:number;
    VendorName:string;
}

//Used in create proposal page to add row
export class ProposalAddRow{
    TransportId:number;
    TransportName:string;
    TransportRate:number;
    LoadingId:number;
    LoadingName:string;
    LoadingRate:number;
    UnloadingId:number;
    UnloadingName:string;
    UnloadingRate:number;
}

export class Proposal{    
    ProposalId:number;
    ProposalName:string;
}

export class SeekProposalRange{
    UbtId:string;
    CategoryId:number;
    GoodsType:string;
    Status:string;
}

export class ProposalDetails extends Ubt{
    /* ProposalId:number;
    ProposalName:string;
    TransportId:number;
    TransportName:string;
    TransportRate:number;
    LoadingId:number;
    LoadingName:string;
    LoadingRate:number;
    UnloadingId:number;
    UnloadingName:string;
    UnloadingRate:number; */
}

export class CreateProposal{
    UbtId:string;
    CategoryId:number;
    GoodsType:string;
    ProposalInfo:string;
    Status:string;    
}

//PURCHASE ORDER
export class SeekPO extends Ubt{
    ProposalId:number;
    ProposalName:string;
    TransporterId:number;
    TransporterName:string;
    TransporterAmount:number;
    LoadingContId:number;
    LoadingContName:string;
    LoadingContAmount:number;
    UnloadingContId:number;
    UnloadingContName:string;
    UnloadingContAmount:number;
    SuppliedQty:number;
    SuppliedPrice:number;
    isChecked: boolean;
}


export class CreatePO{
    ProposalId:number;
    POInfo:string;
    Status:string;    
}

//For Tree view generation
export class TreeUbt
{
    UbtId:string;
    Expanded:boolean = false;
    TCategory:TreeCategory;
}
export class TreeCategory
{
    CategoryId:number;
    CategoryName:string;
    GoodsTypes:string;
    UbtId:string;
    TProposal:TreeProposal;
}

export class TreeProposal
{
    ProposalId:number;
    ProposalName:string;
}