
export class Plants {
    PlantName:string;
    Email :any;
    AlternateEmail:any;
    Mobile:any;
    AlternateMobile:any;
    Address1:any;
    Address2:any;
    Address3:any;
    CIN:any;
    GSTIN:any;
    PAN:any;
    TAN_NO:any;
    CompanyId:any;
    Status:any;
    FileDetails:any=new FileDetails();
}
export class FileDetails {
    FilePath:any;
    EncryptedFile: any;
    FileExtn: any;
    UploadedFileName: any
}