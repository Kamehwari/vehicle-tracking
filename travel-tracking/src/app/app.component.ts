import { Component } from '@angular/core';
import { AppserviceService } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTEND';
  public name = "Kameswari";
  public vehiclesList : any;
  public message = ""
  constructor(
    private apiServicesService: AppserviceService,

  ) { }
  ngOnInit(): void {
    this.fetchVehicle()
  }

  fetchVehicle(){
      this.apiServicesService.get("vehicles",{} ).subscribe(schedularResponse =>{
        console.log(schedularResponse)
        if(schedularResponse.code == 200){
          console.log("/", schedularResponse.message)
          this.vehiclesList=schedularResponse.vehicle;
          console.log(this.vehiclesList)
        }else{
          this.vehiclesList=[];
        }
      },(error)=>{
        console.log(error)
      })
  }


}
