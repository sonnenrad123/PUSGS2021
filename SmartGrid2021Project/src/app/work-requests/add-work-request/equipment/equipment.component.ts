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
  canEnable: boolean = true;
  done = [
    
  ];
  constructor(private deviceService: DeviceService, private wrService: WorkRequestsService, private router:Router) { }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe(
      (data) => {
        this.allEquipment = data;
        //console.log(data);
        if(WorkRequestsService.wrEquipment !== undefined){
          this.done = WorkRequestsService.wrEquipment as any;
          this.allEquipment = this.allEquipment.filter(item1 => !!this.done.find(item2 => item1.id !== item2.id));
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
    this.wrService.SaveWREquipment(this.done);
    //this.canEnable = true;
  }

  Cancel(){
    this.router.navigate(['WorkRequests']);
  }
}
