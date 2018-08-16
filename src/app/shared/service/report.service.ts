import { Injectable, Inject } from '@angular/core';

import { HttpReq, ErrorMessage } from '../common/interfaces';
import { Util } from "../utils/util";
import { Storage } from "../utils/storage";
import { ApexService } from "./apex.service";
import { map, filter, scan } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Injectable()
export class ReportService {
    public PDF_TYPE_PRINT = "PRINT";
    public PDF_TYPE_OPEN = "OPEN";
    public PDF_TYPE_DOWNLOAD = "DOWNLOAD";
    public CSV_TYPE_DOWNLOAD = "CSV";
    public REPORT_URL: string;

    //headers: Headers;
    CONTENT_TYPE: string = "application/x-www-form-urlencoded";
    // CONTENT_TYPE : string = "application/json";
    public API_ENDPOINT: string;
    constructor(private apexService: ApexService) {

    }

 

  
    

    getJwt() {
        return Storage.getJWT();
    }
    // imgload(id) {
    //     let url = Props.API_END_POINT + '/img/' + id;
    //     return new Promise((resolve, reject) => {
    //         var xhr = new XMLHttpRequest();;
    //         xhr.open("GET", url);
    //         xhr.setRequestHeader("Content-type", this.CONTENT_TYPE);
    //         xhr.onreadystatechange = (() => {
    //             if (xhr.readyState == 0 || xhr.readyState == 4) {
    //                 var data = JSON.parse(xhr. response);
    //                 if (data.status == 1) {
    //                     resolve(data.data);
    //                 } else {
    //                     this.errorMessage(data.error);
    //                     reject(data);
    //                 }
    //             }
    //         });
    //         xhr.send();
    //     });
    // }

   
    pdf(httpReq: HttpReq, fileName: string) {
        this.showLoader(true);
        let paramString = Util.GetParamString(httpReq.body ? httpReq.body.data : {});
        let url = this.API_ENDPOINT + httpReq.url + paramString;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        //xhr. responseType = "blob";
        xhr.setRequestHeader("Content-type", this.CONTENT_TYPE);
        xhr.onload = () => {
            if (xhr.status === 200) {
                this.showLoader(false);
                var blob = xhr.response;
                //  Util.ES.PrintPopup(blob);
                ReportService.PrintPopup(blob);
            }
        };
        xhr.send();
    }

    showLoader(show: boolean) {
        this.apexService.showLoader(show);
    }
    errorMessage(err: ErrorMessage) {
        if(err.message) {
            this.apexService.showMessage(err.message);
        } else if(err.code) {
            this.apexService.showMessage(err.code);
        } else {
            this.apexService.showMessage(""+err);
        }
        
    }

    static PrintPopup(data: any) {
        //    console.log(data);
        // if(typeof cordova === 'undefined') {
        var frame1 = document.createElement('iframe');
        frame1.name = "frame1";
        frame1.style.position = "absolute";
        frame1.style.top = "-1000000px";
        document.body.appendChild(frame1);
        var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument['document'] ? frame1.contentDocument['document'] : frame1.contentDocument;
        frameDoc.document.open();
        frameDoc.document.write(data);
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            document.body.removeChild(frame1);
        }, 500);
        return false;
        // }else {
        //     cordova.plugins.printer.print(data, {duplex: 'long'}, function (res : any) {
        //         alert(res ? 'Done' : 'Canceled');
        //     });
        // }
    }
    printPopup(data: any) {
        //    console.log(data);
        // if(typeof cordova === 'undefined') {
        var frame1 = document.createElement('iframe');
        frame1.name = "frame1";
        frame1.style.position = "absolute";
        frame1.style.top = "-1000000px";
        document.body.appendChild(frame1);
        var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument['document'] ? frame1.contentDocument['document'] : frame1.contentDocument;
        frameDoc.document.open();
        frameDoc.document.write(data);
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            document.body.removeChild(frame1);
        }, 500);
        return false;
        // }else {
        //     cordova.plugins.printer.print(data, {duplex: 'long'}, function (res : any) {
        //         alert(res ? 'Done' : 'Canceled');
        //     });
        // }
    }

    openPopup(data: any) {
        var innerContents = data;
        var popupWinindow = window.open('', '_blank', 'width=850,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write(data);
        popupWinindow.document.close();
        return false;
    }

    downloadPDF(data: any) {
        // var printDoc: jsPDF = new jsPDF();
        // printDoc.fromHTML(data, 10, 10, { 'width': 180 });
        // printDoc.save('invoice' + new Date().toISOString() + ".pdf");
        //printDoc.openPopup()
        // return false;
    }
    downloadCSV(data: any, fileName: any) {
        var blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        return false;
    }

}


