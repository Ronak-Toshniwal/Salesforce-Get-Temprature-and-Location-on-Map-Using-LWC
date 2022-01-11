import { LightningElement, wire, api, track } from 'lwc';
import { getRecord  } from 'lightning/uiRecordApi';
import Street_FIELD from '@salesforce/schema/Account.BillingStreet';
import City_field from '@salesforce/schema/Account.BillingCity';
import Country_FIELD from '@salesforce/schema/Account.BillingCountry';


export default class ShowMapinLWC extends LightningElement {
    record;
    @api recordId;
   @wire(getRecord, { recordId: '$recordId', fields: [Street_FIELD, City_field,  Country_FIELD] }) 
   wiredProject({ error, data }) {
    if (data) {
        this.record = data;
        console.log(this.record);
        this.mapMarkers = [
           {
               location: {
                   Street: this.record.fields.BillingStreet.value,
                   City: this.record.fields.BillingCity.value,
                   State: this.record.fields.BillingCountry.value,
               },
                 title: 'Test Title',
                description: 'Test Description',
                icon: 'standard:account',
           },   
       ];
       this.zoomLevel = 15;
        this.error = undefined;
    } else if (error) {
        this.error = error;
        this.record = undefined;
    }
   }
}