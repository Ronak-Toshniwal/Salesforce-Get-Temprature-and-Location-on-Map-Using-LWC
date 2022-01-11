import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue  } from 'lightning/uiRecordApi';
import BillingCity_FIELD from '@salesforce/schema/Account.BillingCity';
import City from '@salesforce/schema/Lead.City';
export default class TempratureLWC extends LightningElement {
    @api recordId;
     //default
    fullData= {};
    record; flag=false;
    cityName = ''
    @wire(getRecord, { recordId: '$recordId', fields: [BillingCity_FIELD] })
    wiredProject({ error, data }) {
        if (data) {
            this.record = data;
            this.fullURL = 'https://bestweather.p.rapidapi.com/weather/' + this.record.fields.BillingCity.value + '/today' ;
            console.log('wired', this.fullURL);
            this.getData;
        } else if (error) {
            this.error = error;
            this.record = undefined;
        }
       }

       renderedCallback(){
          setTimeout(() => this.getData(), 2000) 
          console.log('one', this.fullURL);
       }
       icon;
     
       fullURL;
     async getData(){
        console.log('inside async', this.fullURL);
        let resp = await fetch(this.fullURL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "bestweather.p.rapidapi.com",
                "x-rapidapi-key": "186cc26c4fmsh66112af78bfba59p119385jsn6569d716a0af"
            }
        })
        if(resp.ok){
            let data = await resp.json();
           this.fullData.city = data.address;
            this.fullData.condition = data.currentConditions.conditions;
            this.fullData.feelsLike = data.currentConditions.feelslike;
            this.fullData.humidity = data.currentConditions.humidity;
            this.fullData.icon = data.currentConditions.icon;
            this.fullData.tempF = data.currentConditions.temp; 
            this.fullData.tempC = Math.round((((this.fullData.tempF-32)*5/9)) * 10)/10 //converstion from fahrenheit to celcius
            this.flag = true;
           console.log('data ', data);
            console.log('data inside obj', this.fullData);
        } else {
            console.log('error inside getData')
        }
    }
   

    
}