import { Component, OnInit} from '@angular/core';
import { DataService } from './providers/data.service';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import Drilldown from 'highcharts/modules/drilldown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nec-ui';

  ngOnInit(){
    this.getIncidentRequest();
    this.getItTickets();
    // this.getCovidCabDetails();
  }

  totalCabRequests: any;
  totalTravelRequests: any;
  totalCovidRequests: any;

  totalIncidentRequest: any = 0;

  totalOpenStatusIncidentReuest: any = 0;
  totalReopenedStatusIncidentReuest: any = 0;
  totalNewStatusIncidentReuest: any = 0;
  totalAssignedStatusIncidentReuest: any = 0;
  totalInProgressStatusIncidentReuest: any = 0;
  totalPendingStatusIncidentReuest: any = 0;
  totalResolvedStatusIncidentReuest: any = 0;
  totalClosedStatusIncidentReuest: any = 0;
  totalCancelledStatusIncidentReuest: any = 0;

  statusSelectedAndDateSelectedIncidentRequest: any;

  type:any = 'ColumnChart';  
  incidentsData = [  
     ["2014", 200],  
     ["2015", 560],  
     ["2016", 280],  
     ["2017", 300],  
     ["2018", 600]  
  ];  
  incidentsOptions = {};  
  incidentsWidth = 600;  
  incidentsHeight = 400;

  incidentFromDate: any;
  incidenToDate: any;
  selectedIncidentsValue: any;
  incidentStatus = [
    "Open", "Reopened", "New", "Assigned", "In-Progress", "Pending", "Resolved", "Closed", "Cancelled"
  ];

  incidentDonuttype:any = 'PieChart';
  incidentsDonutdata = [
    ['Incidents %', 45.0],
    ['Remaining %', 55.0]
  ];
  incidentsDonutoptions = {    
    pieHole:0.5,
    align: 'left',
    layout: 'horizontal',
    verticalAlign: 'top',
    x: -40,
    y: -20
  };
  incidentsDonutwidth = 550;
  hincidentsDonuteight = 400;

  constructor(
    private dataService : DataService,
    public datepipe: DatePipe
  ){}
  getItTickets(){
    let data = {
      "ServiceName": "IM_GetIncidentList",
      "objCommonParameters": {
        "_ProxyDetails":{
          "TokenID": "",
          "OrgID": "1",
          "ReturnType": "JSON",
          "Password": "N@12678%$#@*ec",
          "UserName": "symphony.api@india.nec.com",
          "ProxyID": 0
        },
        "objIncidentCommonFilter": {
          "WorkgroupName": "",
          "CurrentPageIndex": 0,
          "PageSize": 0,
          "OrgID": "1",
          "Instance": "IT",
          "Status": "Resolved",
          "strUpdatedFromDate": "",
          "strUpdatedToDate": "",
          "IsWebServiceRequest": true
        }
      }
    };
    this.dataService.getItTickets(data).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  // getCovidCabDetails(){
  //   this.dataService.getCovidCabDetails().subscribe(
  //     res => {
  //       console.log(res);
  //       this.totalCabRequests = res.Total_Cab_Request;
  //       this.totalTravelRequests = res.Total_Travel_Request;
  //       this.totalCovidRequests = res.Total_Covid_Request;
  //     }
  //   );
  // }

  getIncidentRequest() {
    for(var i = 0; i < this.incidentStatus.length; i += 1) {
      let status = this.incidentStatus[i];
      console.log(status);
      let data = {
        "ServiceName": "IM_GetIncidentList",
        "objCommonParameters": {
         "_ProxyDetails":{
        "TokenID": "",
        "OrgID": "1",
        "ReturnType": "JSON",
        "Password": "N@12678%$#@*ec",
        "UserName": "symphony.api@india.nec.com",
        "ProxyID": 0},
        "objIncidentCommonFilter": {
              "WorkgroupName": "",
              "CurrentPageIndex": 0,
              "PageSize": 0,
              "OrgID": "1",
              "Instance": "IT",
              "Status": status,
              "strUpdatedFromDate": "",
              "strUpdatedToDate": "",
              "IsWebServiceRequest": true
            }
          }
        };
  
        this.dataService.getIncidentsTickets(data).subscribe(
          res => {
            console.log("Incidents response: ");
            console.log(res);
            console.log(res.OutputObject.MyTickets[0].TotalRows);
            if(status ===  'Open') {
            this.totalOpenStatusIncidentReuest = res.OutputObject.MyTickets[0].TotalRows;
            this.totalIncidentRequest = this.totalIncidentRequest + res.OutputObject.MyTickets[0].TotalRows;
            }
            if(status ===  'Reopened') {
            this.totalReopenedStatusIncidentReuest = res.OutputObject.MyTickets[0].TotalRows;
            this.totalIncidentRequest = this.totalIncidentRequest + res.OutputObject.MyTickets[0].TotalRows;
            }
            if(status ===  'New') {
            this.totalNewStatusIncidentReuest = res.OutputObject.MyTickets[0].TotalRows;
            this.totalIncidentRequest = this.totalIncidentRequest + res.OutputObject.MyTickets[0].TotalRows;
            }
            if(status ===  'Assigned') {
            this.totalAssignedStatusIncidentReuest = res.OutputObject.MyTickets[0].TotalRows;
            this.totalIncidentRequest = this.totalIncidentRequest + res.OutputObject.MyTickets[0].TotalRows;
            }
            if(status ===  'In-Progress') {
            this.totalInProgressStatusIncidentReuest = res.OutputObject.MyTickets[0].TotalRows;
            this.totalIncidentRequest = this.totalIncidentRequest + res.OutputObject.MyTickets[0].TotalRows;
            }
            if(status ===  'Pending') {
            this.totalPendingStatusIncidentReuest = res.OutputObject.MyTickets[0].TotalRows;
            this.totalIncidentRequest = this.totalIncidentRequest + res.OutputObject.MyTickets[0].TotalRows;
            }
            if(status ===  'Resolved') {
            this.totalResolvedStatusIncidentReuest = res.OutputObject.MyTickets[0].TotalRows;
            this.totalIncidentRequest = this.totalIncidentRequest + res.OutputObject.MyTickets[0].TotalRows;
            }
            if(status ===  'Closed') {
            this.totalClosedStatusIncidentReuest = res.OutputObject.MyTickets[0].TotalRows;
            this.totalIncidentRequest = this.totalIncidentRequest + res.OutputObject.MyTickets[0].TotalRows;
            }
            if(status ===  'Cancelled') {
            this.totalCancelledStatusIncidentReuest = res.OutputObject.MyTickets[0].TotalRows;
            this.totalIncidentRequest = this.totalIncidentRequest + res.OutputObject.MyTickets[0].TotalRows;
            }
          }
        );
    }
  }

  updateDates(){
    if(this.incidentFromDate==null){
      this.incidentFromDate="";
    }else{
      this.incidentFromDate = this.datepipe.transform(this.incidentFromDate, 'yyyy-MM-dd');
    }
    if(this.incidenToDate==null){
      this.incidenToDate="";
    }else{
      this.incidenToDate = this.datepipe.transform(this.incidenToDate, 'yyyy-MM-dd');
    }
    console.log("F-D : "+this.incidentFromDate);
    console.log("T-D : "+this.incidenToDate);
    console.log("Incident-Selected : "+this.selectedIncidentsValue);

    let data = {
      "ServiceName": "IM_GetIncidentList",
      "objCommonParameters": {
       "_ProxyDetails":{
      "TokenID": "",
      "OrgID": "1",
      "ReturnType": "JSON",
      "Password": "N@12678%$#@*ec",
      "UserName": "symphony.api@india.nec.com",
      "ProxyID": 0},
      "objIncidentCommonFilter": {
            "WorkgroupName": "",
            "CurrentPageIndex": 0,
            "PageSize": 0,
            "OrgID": "1",
            "Instance": "IT",
            "Status": this.selectedIncidentsValue,
            "strUpdatedFromDate": this.incidentFromDate,
            "strUpdatedToDate": this.incidenToDate,
            "IsWebServiceRequest": true
          }
        }
      };

      this.dataService.getIncidentsTickets(data).subscribe(
        res => {
          let StatusSelectedPercentage = 0;
          console.log("Incidents response: ");
          console.log(res);
          console.log(res.OutputObject.MyTickets[0].TotalRows);
          this.statusSelectedAndDateSelectedIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
          if(this.selectedIncidentsValue ===  'Open') {
            StatusSelectedPercentage = (res.OutputObject.MyTickets[0].TotalRows/this.totalOpenStatusIncidentReuest)*100;
            this.incidentsDonutdata = [
              ['Incidents %', StatusSelectedPercentage],
              ['Remaining %', 100-StatusSelectedPercentage]
            ];
            console.log("StatusSelectedPercentage: "+StatusSelectedPercentage);
            }
            if(this.selectedIncidentsValue ===  'Reopened') {
              StatusSelectedPercentage = (res.OutputObject.MyTickets[0].TotalRows/this.totalReopenedStatusIncidentReuest)*100;
              this.incidentsDonutdata = [
                ['Incidents %', StatusSelectedPercentage],
                ['Remaining %', 100-StatusSelectedPercentage]
              ];
              console.log("StatusSelectedPercentage: "+StatusSelectedPercentage);
            }
            if(this.selectedIncidentsValue ===  'New') {
              StatusSelectedPercentage = (res.OutputObject.MyTickets[0].TotalRows/this.totalNewStatusIncidentReuest)*100;
              this.incidentsDonutdata = [
                ['Incidents %', StatusSelectedPercentage],
                ['Remaining %', 100-StatusSelectedPercentage]
              ];
              console.log("StatusSelectedPercentage: "+StatusSelectedPercentage);
            }
            if(this.selectedIncidentsValue ===  'Assigned') {
              StatusSelectedPercentage = (res.OutputObject.MyTickets[0].TotalRows/this.totalAssignedStatusIncidentReuest)*100;
              this.incidentsDonutdata = [
                ['Incidents %', StatusSelectedPercentage],
                ['Remaining %', 100-StatusSelectedPercentage]
              ];
              console.log("StatusSelectedPercentage: "+StatusSelectedPercentage);
            }
            if(this.selectedIncidentsValue ===  'In-Progress') {
              StatusSelectedPercentage = (res.OutputObject.MyTickets[0].TotalRows/this.totalInProgressStatusIncidentReuest)*100;
              this.incidentsDonutdata = [
                ['Incidents %', StatusSelectedPercentage],
                ['Remaining %', 100-StatusSelectedPercentage]
              ];
              console.log("StatusSelectedPercentage: "+StatusSelectedPercentage);
            }
            if(this.selectedIncidentsValue ===  'Pending') {
              StatusSelectedPercentage = (res.OutputObject.MyTickets[0].TotalRows/this.totalPendingStatusIncidentReuest)*100;
              this.incidentsDonutdata = [
                ['Incidents %', StatusSelectedPercentage],
                ['Remaining %', 100-StatusSelectedPercentage]
              ];
              console.log("StatusSelectedPercentage: "+StatusSelectedPercentage);
            }
            if(this.selectedIncidentsValue ===  'Resolved') {
              StatusSelectedPercentage = (res.OutputObject.MyTickets[0].TotalRows/this.totalResolvedStatusIncidentReuest)*100;
              this.incidentsDonutdata = [
                ['Incidents %', StatusSelectedPercentage],
                ['Remaining %', 100-StatusSelectedPercentage]
              ];
              console.log("StatusSelectedPercentage: "+StatusSelectedPercentage);
            }
            if(this.selectedIncidentsValue ===  'Closed') {
              StatusSelectedPercentage = (res.OutputObject.MyTickets[0].TotalRows/this.totalClosedStatusIncidentReuest)*100;
              this.incidentsDonutdata = [
                ['Incidents %', StatusSelectedPercentage],
                ['Remaining %', 100-StatusSelectedPercentage]
              ];
              console.log("StatusSelectedPercentage: "+StatusSelectedPercentage);
            }
            if(this.selectedIncidentsValue ===  'Cancelled') {
              StatusSelectedPercentage = (res.OutputObject.MyTickets[0].TotalRows/this.totalCancelledStatusIncidentReuest)*100;
              this.incidentsDonutdata = [
                ['Incidents %', StatusSelectedPercentage],
                ['Remaining %', 100-StatusSelectedPercentage]
              ];
              console.log("StatusSelectedPercentage: "+StatusSelectedPercentage);
            }
        }
      );
  }
}
