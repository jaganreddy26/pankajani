export interface HttpReq {
     url: string;
     type: string;
     showLoader: boolean;
     body: any;
}

export interface ErrorMessage{
    code: string;
    message: string;
}
export interface Menu {
    id: string;
    name: string;
    link: string;
    show: boolean;
    icon: string;
}

export interface SessionUser{
     id: string;
     firstName: string;
     lastName: string;
     email: string;
     role: string;
	 mobile : string;
     loginUser: boolean;
     photo: string;
     branchId: string;
	 branchName: string;
     menuList: Menu[];
}

export interface KeyValue{
     id: any;
     name: any;
}
export interface LoadMore {
     orderBy: string;
     isAsc: boolean;
     limit: number;
     offset: number;
}
export interface NameList {
     name: string;
     list: KeyValue[];
}
export interface ReportData {
	id : string;
	name: string;
	status: boolean;
}
export interface Report {
	id : string;
	name: string;
	reportUrl: string;
	reportDataList: ReportData [];
}
