import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount=0;


  constructor(private spinnerService:NgxSpinnerService) { }


  busy() {
    console.log('Busy method called');
    this.busyRequestCount++;
    console.log('Busy request count:', this.busyRequestCount);
  
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333',
    });
  }
  
  idle() {
    this.busyRequestCount--;
    console.log('Idle method called');
    console.log('Busy request count after decrement:', this.busyRequestCount);
  
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
      console.log('Spinner hidden');
    }
  }
  
}
