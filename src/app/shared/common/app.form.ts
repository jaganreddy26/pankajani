import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


export class AppFormGroup {
    static TYPE_ALL: string = 'ALL';
    static TYPE_DATA: string = 'DATA';
    static TYPE_DECIMAL: string = 'DECIMAL';
    static TYPE_NUMBER: string = 'NUMBER';
    static TYPE_DATE: string = 'DATE';
    static TYPE_EMAIL: string = 'EMAIL';
    static TYPE_WEBSITE: string = 'WEBSITE';
    static TYPE_ALFA: string = 'CHAR';
    static TYPE_ALFA_DES: string = 'CHAR_DES';
    static TYPE_ALFA_NUM_DES_SPACE: string = 'TYPE_ALFA_NUM_DES_SPACE';
    static TYPE_ALFA_NUM_DES_SPACE_HIFEN: string = 'ALFA_NUM_DES_SPACE_HIFEN';
    static TYPE_ALFA_NUM: string = 'ALFA_NUM';
    static TYPE_COMBI_NUM: string = 'COMBI_NUM';
    static TYPE_IFSC_CODE: string = 'IFSC_CODE';
    static TYPE_ZIP_CODE: string = 'ZIP_CODE';
    static TYPE_GST_CODE: string = 'GST_CODE';
    static TYPE_PAN_NO: string = 'PAN_NO';
    static TYPE_MOBILE_NO: string = 'MOBILE_NO';
    static TYPE_BUSI_NAME: string = 'BUSI_NAME';
    static TYPE_PHONE_NO: string = 'PHONE_NO';
    
    //static EMAIL_PATTERN: string = '([a-zA-Z0-9.-_]){1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    static EMAIL_PATTERN: string = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$';
    //static WEBSITE_PATTERN: string = 'w{3}\.[a-z]+\.?[a-z]{2,3}(|\.[a-z]{2,3})';
    static ALFA_PATTERN: string = '^[a-zA-Z\']+';
    //static ALFA_DES_PATTERN: string = '^[a-zA-Z\ -\']+';
    static NAME :string = '^([A-Za-z0-9&.,-]+ )+[A-Za-z0-9&.,-]+$|^[A-Za-z0-9&.,-]+$';
    static DEPARTNAME :string = '^([A-Za-z0-9!@&-/]+ )+[A-Za-z0-9!@&-/]+$|^[A-Za-z0-9!@&-/]+$';
    static DESCRIPTION :string = '^([A-Za-z0-9!@#$%^&*()_+=`~\\][{}|\'\"-;:/.,?><]+ )+[A-Za-z0-9!@#$%^&*()_+=`~\\][{}|\'\"-;:/.,?><]+$|^[A-Za-z0-9!@#$%^&*()_+=`~\\][{}|\'\"-;:/.,?><]+$';
    static ALFA_DES_PATTERN: string = '^([A-Za-z0-9&.-]+ )+[A-Za-z0-9&.-]+$|^[A-Za-z0-9&.-]+$';
    static ALL_PATTERN: string = '(.*?)';
    static DATA_PATTERN: string = '[\\w\\d\\s.,&@:;!#-=]*';
    static DECIMAL_PATTERN: string = '(\\d+(\\.\\d{1,2})?)';
    static NUMBER_PATTERN: string = '[0-9]*$';
    //static NUMBER_PATTERN: string = '[1-9]?\d';
    //static DATE_PATTERN: string = '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(T?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))';
    static DATE_PATTERN: string = '[\\w\\d\\s.,&@:;!#-=]*';
    static ALFA_NUM_DES_SPACE_PATTERN: string = '^[0-9a-zA-Z/ -]+$';
    static ALFA_NUM_DES_SPACE_HIFEN_PATTERN: string = '^[A-Za-z0-9? ,_-]+$';
    static ALFA_NUM_PATTERN: string = '^[a-zA-Z0-9]+';
    static IFSC_CODE_PATTERN: string = '^[A-Z|a-z]{4}[0][0-9]{6}$';

    static ZIP_CODE_PATTERN: string = '([1-9])([0-9]){5}$';
    static GST_CODE_PATTERN: string = '[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$';
    static PAN_NO_PATTERN: string = '[A-Z|a-z]{3}(p|P|c|C|h|H|f|F|a|A|t|T|b|B|l|L|j|J|g|G)[A-Z|a-z][0-9]{4}[A-Z|a-z]$';
    static MOBILE_NO_PATTERN: string = '^[7-9][0-9]{9}$';
    //static BUSI_NAME_PATTERN: string = '([A-Za-z])+( [A-Za-z]+)';
    static BUSI_NAME_PATTERN: string = '([A-Za-z])+( [A-Za-z]+)*$';
    static PHONE_NO_PATTERN: string = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}';

    static ALFA_SPACE_PATTERN: string = '[a-zA-Z0-9_ ]*$';

    static PIN_CODE_PATTERN: string = '^[1-9][0-9]{5}$';
  
    //static IFSC_CODE_PATTERN: string = '([0-9]{2,2}|[0-9]{4,4}|[0-9]{6,6}|[0-9]{8,8})';
   // static IFSC_CODE_PATTERN: string = '/^[A-Z|a-z]{4,4}[0-9]{6}$';



    static getFormGroup() {
        return new FormBuilder().group({});
    }

    static getController(require: boolean, type: String, minLength: number, maxLength: number) {
        let compose: any = [];
        if (require) {
            compose.push(Validators.required)
        }
        if (type) {
            switch (type) {
                case AppFormGroup.TYPE_ALL: compose.push(Validators.pattern(AppFormGroup.ALL_PATTERN)); break;
                case AppFormGroup.TYPE_DATA: compose.push(Validators.pattern(AppFormGroup.DATA_PATTERN)); break;
                case AppFormGroup.TYPE_DECIMAL: compose.push(Validators.pattern(AppFormGroup.DECIMAL_PATTERN)); break;
                case AppFormGroup.TYPE_NUMBER: compose.push(Validators.pattern(AppFormGroup.NUMBER_PATTERN)); break;
                case AppFormGroup.TYPE_DATE: compose.push(Validators.pattern(AppFormGroup.DATE_PATTERN)); break;
                case AppFormGroup.TYPE_EMAIL: compose.push(Validators.pattern(AppFormGroup.EMAIL_PATTERN)); break;
                case AppFormGroup.TYPE_ALFA: compose.push(Validators.pattern(AppFormGroup.ALFA_PATTERN)); break;
                case AppFormGroup.TYPE_ZIP_CODE: compose.push(Validators.pattern(AppFormGroup.ZIP_CODE_PATTERN)); break;
                case AppFormGroup.TYPE_GST_CODE: compose.push(Validators.pattern(AppFormGroup.GST_CODE_PATTERN)); break;
                case AppFormGroup.TYPE_PAN_NO: compose.push(Validators.pattern(AppFormGroup.PAN_NO_PATTERN)); break;
                case AppFormGroup.TYPE_PHONE_NO: compose.push(Validators.pattern(AppFormGroup.PHONE_NO_PATTERN)); break;
                case AppFormGroup.TYPE_MOBILE_NO: compose.push(Validators.pattern(AppFormGroup.MOBILE_NO_PATTERN)); break;
                case AppFormGroup.TYPE_ALFA_DES: compose.push(Validators.pattern(AppFormGroup.ALFA_DES_PATTERN)); break;
                case AppFormGroup.TYPE_BUSI_NAME: compose.push(Validators.pattern(AppFormGroup.BUSI_NAME_PATTERN)); break;
                case AppFormGroup.TYPE_IFSC_CODE: compose.push(Validators.pattern(AppFormGroup.IFSC_CODE_PATTERN)); break;
                case AppFormGroup.NAME: compose.push(Validators.pattern(AppFormGroup.NAME)); break;
                case AppFormGroup.DEPARTNAME: compose.push(Validators.pattern(AppFormGroup.DEPARTNAME)); break;
                case AppFormGroup.DESCRIPTION: compose.push(Validators.pattern(AppFormGroup.DESCRIPTION)); break;
                case AppFormGroup.TYPE_ALFA_NUM_DES_SPACE: compose.push(Validators.pattern(AppFormGroup.ALFA_NUM_DES_SPACE_PATTERN)); break;
                case AppFormGroup.TYPE_ALFA_NUM_DES_SPACE_HIFEN: compose.push(Validators.pattern(AppFormGroup.ALFA_NUM_DES_SPACE_HIFEN_PATTERN)); break;
                case AppFormGroup.TYPE_ALFA_NUM: compose.push(Validators.pattern(AppFormGroup.ALFA_NUM_PATTERN)); break;
                default: compose.push(Validators.pattern(AppFormGroup.ALL_PATTERN)); break;
            }
        }
        if (minLength) {
            compose.push(Validators.minLength(minLength));
        }
        if (maxLength) {
            compose.push(Validators.maxLength(maxLength));
        }
        return new FormControl('', Validators.compose(compose));
    }
}