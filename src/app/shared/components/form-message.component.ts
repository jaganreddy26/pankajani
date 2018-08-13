import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../service/validation.service';

@Component({
    selector: 'form-messages',
    template: `<div class='error-message' *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
    styles: ['.error-message { color: #802221; font-size: 100% !important}']
})
export class FormMessagesComponent {
    @Input() control: FormControl;
    constructor() { }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}