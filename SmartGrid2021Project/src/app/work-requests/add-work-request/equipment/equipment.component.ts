import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device/device.service';
import { WorkRequestsService } from 'src/app/services/work-request/work-requests.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  allEquipment: any[];
  allEquipmentCopy: any[];
  done = [
    
  ];
  constructor(private deviceService: DeviceService, private wrService: WorkRequestsService, private router:Router) { }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe(
      (data) => {
        this.allEquipment = data;
        this.allEquipmentCopy = data;

        //console.log(data);
        if(window.sessionStorage.getItem('WREquCurrValue') !== null){
          this.done = JSON.parse(window.sessionStorage.getItem('WREquCurrValue'));
          if(this.done.length !== this.allEquipment.length && this.done.length > 0){
          this.allEquipment = this.allEquipment.filter(item1 => !!this.done.find(item2 => item1.id.toString() !== item2.id.toString()));
          }
          else{
            this.allEquipment = new Array<any>();
          }
          
          if(this.done.length === 0)
          {
            this.allEquipment = this.allEquipmentCopy;
          }
       }
        
      },
      err =>{
        console.log(err);
      }
    );
    

  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    //this.canEnable = WorkRequestsService.wrEquipment === this.done;
  }

  SaveChanges(){
    window.sessionStorage.removeItem('WREquCurrValue');
    window.sessionStorage.setItem('WREquCurrValue', JSON.stringify(this.done));

  }

  Cancel(){
    this.router.navigate(['WorkRequests']);
  }
}
