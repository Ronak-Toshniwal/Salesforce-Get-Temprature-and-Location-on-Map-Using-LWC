import { LightningElement, track } from 'lwc';

export default class TestTrackProperty extends LightningElement {
    
    
    @track testObject = {
        name:'Ronak',
        age : 26
    }

    getVal(e){
        this.testObject.name = e.target.value;
    }
}