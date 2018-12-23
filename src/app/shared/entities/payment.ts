export class Payment {
    ObjectType: any;
    CompanyId: any;
    ReferenceId: any;
    PaymentAmount: any;
    PaymentDate: any;
    TransferFromAc: any;
    TransferToAc: any;
    BankName: any;
    UTRNo: any;
    PaymentMode: any;
    PaymentReason: any;
    PaymentType: any;
    FileDetails: any =  new FileDetails()
}
export class FileDetails {
    EncryptedFile: any;
    FileExtn: any;
    UploadedFileName: any
}