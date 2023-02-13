import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import Drilldown from 'highcharts/modules/drilldown';
import { DataService } from '../providers/data.service';

@Component({
  selector: 'app-it',
  templateUrl: './it.component.html',
  styleUrls: ['./it.component.css']
})

export class ItComponent implements OnInit  {
  title = 'nec-ui';
  adminIncidents: any;
  hrInicdents: any;
  itIncidents: any;
  
  closedIncidents: any;
  openIncidents: any;
  pendingIncidents: any;
  reopenedIncidents: any;
  newIncidents: any;
  assignedIncidents: any;
  resolvedIncidents: any;
  cancelledIncidents: any;
  inprogressIncidents: any;
  showPie: boolean = true;
  showMessage: boolean = false;
  closedServices: any;
  openServices: any;
  pendingServices: any;
  reopenedServices: any;
  newServices: any;
  assignedServices: any;
  resolvedServices: any;
  cancelledServices: any;
  inprogressServices: any;

  totalCabRequests: any;
  totalTravelRequests: any;
  totalCovidRequests: any;

  totalIncidentRequest: any = 0;

  totalOpenStatusIncidentRequest: any = 0;
  totalReopenedStatusIncidentRequest: any = 0;
  totalNewStatusIncidentRequest: any = 0;
  totalAssignedStatusIncidentRequest: any = 0;
  totalInProgressStatusIncidentRequest: any = 0;
  totalPendingStatusIncidentRequest: any = 0;
  totalResolvedStatusIncidentRequest: any = 0;
  totalClosedStatusIncidentRequest: any = 0;
  totalCancelledStatusIncidentRequest: any = 0;

  totalServiceRequest: any = 0;
  totalOpenStatusServiceRequest: any = 0;
  totalReopenedStatusServiceRequest: any = 0;
  totalNewStatusServiceRequest: any = 0;
  totalAssignedStatusServiceRequest: any = 0;
  totalInProgressStatusServiceRequest: any = 0;
  totalPendingStatusServiceRequest: any = 0;
  totalResolvedStatusServiceRequest: any = 0;
  totalClosedStatusServiceRequest: any = 0;
  totalCancelledStatusServiceRequest: any = 0;

  statusSelectedAndDateSelectedIncidentRequest: any;
  statusSelectedAndDateSelectedServiceRequest: any;

  incidentStatusProvider = [
    "Closed", "Open", "Reopened", "New", "Assigned", "In-Progress", "Pending", "Resolved", "Cancelled"
  ];
  userDetails: any;

  constructor(private dataService : DataService,public datepipe: DatePipe){
    this.userDetails = dataService.getSavedUserDetails();
  }

  ngOnInit(){
    this.getIncidentRequest('IT', '', '', '');
    this.getIncidentRequest('IT', '', '', 'Open');
    this.getIncidentRequest('IT', '', '', 'Closed');
    this.getStatusIncidentRequest('Open');
    this.getStatusIncidentRequest('Closed');
    this.getStatusIncidentRequest('New');
    this.getStatusIncidentRequest('Reopened');
    this.getStatusIncidentRequest('Assigned');
    this.getStatusIncidentRequest('In-Progress');
    this.getStatusIncidentRequest('Pending');
    this.getStatusIncidentRequest('Resolved');
    this.getStatusIncidentRequest('Cancelled');

    this.getServiceRequest('IT', '', '', '');
    this.getServiceRequest('IT', '', '', 'Open');
    this.getServiceRequest('IT', '', '', 'Closed');
    this.getStatusServiceRequest('Open');
    this.getStatusServiceRequest('Closed');
    this.getStatusServiceRequest('New');
    this.getStatusServiceRequest('Reopened');
    this.getStatusServiceRequest('Assigned');
    this.getStatusServiceRequest('In-Progress');
    this.getStatusServiceRequest('Pending');
    this.getStatusServiceRequest('Resolved');
    this.getStatusServiceRequest('Cancelled');
  }

  getStatusIncidentRequest(status: string) {
    var data: any;
    if(this.userDetails.role == 'admin'){
      data = {
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
              "Instance": "IT",
              "Status": status,
              "strUpdatedFromDate": "",
              "strUpdatedToDate": "",
              "IsWebServiceRequest": true
            }
          }
        };
    }else{
      data = { 
            "ServiceName": "IM_GetMyIncidents", 
            "objCommonParameters": { 
            "IncidentParam": { 
              "CurrentPageIndex": 0, 
              "Status": status, 
              "PageSize": 20, 
              "Caller":3653
            }, 
            "_ProxyDetails": { 
            "TokenID": "", 
            "OrgID": "1", 
            "ReturnType": "JSON", 
            "Password": "N@12678%$#@*ec", 
            "UserName": "symphony.api@india.nec.com", 
            "ProxyID": 0}, 
            "InstanceCode": "IT"
            }
      };
    }

      this.dataService.getIncidentsTickets(data).subscribe(
        res => {
          if(status == 'Closed'){
            this.closedIncidents = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Open'){
            this.openIncidents = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Pending'){
            this.pendingIncidents = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Reopened'){
            this.reopenedIncidents = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'New'){
            this.newIncidents = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Assigned'){
            this.assignedIncidents = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Resolved'){
            this.resolvedIncidents = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Cancelled'){
            this.cancelledIncidents = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'In-Progress'){
            this.inprogressIncidents = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }

          if(this.closedIncidents >= 0 && this.openIncidents >= 0 && this.pendingIncidents >= 0 && this.reopenedIncidents >= 0 &&this.newIncidents >= 0 && this.assignedIncidents >= 0 && this.resolvedIncidents >= 0 && this.cancelledIncidents >= 0 && this.inprogressIncidents >= 0){
            const status_wise = Highcharts.chart('status-wise', {
              chart: {
                type: 'column'
              },
              title: {
                  text: ''
              },
              colors: ['rgb(166, 166, 205)'],
              yAxis: {
                  title: {
                      text: 'Number'
                  },
                  type: 'logarithmic',
                  minorTickInterval: 100,
                  stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold'
                    }
                }
              },
              xAxis: {
                  categories: ["Closed", "Open", "Pending", "Reopened", "New", "Assigned", "Resolved", "Cancelled", "In-Progress"]
              },
              tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
              },
              series: [{
                  name: 'Incidents',
                  data: [this.closedIncidents, this.openIncidents, this.pendingIncidents, this.reopenedIncidents, this.newIncidents, this.assignedIncidents, this.resolvedIncidents, this.cancelledIncidents, this.inprogressIncidents]
              }],
              responsive: {
                  rules: [{
                      condition: {
                          maxWidth: 500
                      },
                      chartOptions: {
                          legend: {
                              layout: 'horizontal',
                              align: 'center',
                              verticalAlign: 'bottom'
                          }
                      }
                  }]
              }
            
            } as any);
            status_wise.reflow();
          }
        }
      );
  }

  getIncidentRequest(bu: any, startDate: any, endDate: any, status: any) {
    var data : any;
    if(this.userDetails.role == 'admin'){
      data = {
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
              "Instance": bu,
              "Status":status,
              "strUpdatedFromDate": startDate,
              "strUpdatedToDate": endDate,
              "IsWebServiceRequest": true
            }
          }
        };
      }else{
        data = { 
              "ServiceName": "IM_GetMyIncidents", 
              "objCommonParameters": { 
              "IncidentParam": { 
                "CurrentPageIndex": 0, 
                "Status": status, 
                "PageSize": 20, 
                "Caller":3653
              }, 
              "_ProxyDetails": { 
              "TokenID": "", 
              "OrgID": "1", 
              "ReturnType": "JSON", 
              "Password": "N@12678%$#@*ec", 
              "UserName": "symphony.api@india.nec.com", 
              "ProxyID": 0}, 
              "InstanceCode": "IT"
              }
        };
      }
  
        this.dataService.getIncidentsTickets(data).subscribe(
          res => {
            console.log(res)
            if(status ===  'Open') {
            this.totalOpenStatusIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
            }
            else if(status ===  'Closed') {
            this.totalClosedStatusIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
            this.dataService.getIncidentsTickets(data).subscribe(
              res => {
                if(res.OutputObject.MyTickets.length > 0){
                  this.statusSelectedAndDateSelectedIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
                }else{
                  this.statusSelectedAndDateSelectedIncidentRequest = '0';
                }
                const chart_lost_opp = Highcharts.chart('chart-pie-lost-opp', {
                  chart: {
                      plotBackgroundColor: null,
                      plotBorderWidth: 0,
                      plotShadow: false
                  },
                  colors: ['rgb(166, 166, 205)', 'rgb(238, 238, 238)'],
                  title: {
                      text: '<b>'+status + '<br>'+ ((this.statusSelectedAndDateSelectedIncidentRequest/this.totalIncidentRequest)*100).toFixed(2)+'%</b>',
                      align: 'center',
                      verticalAlign: 'middle',
                      y: 10
                  },
                  tooltip: {
                      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                  },
                  accessibility: {
                      point: {
                          valueSuffix: '%'
                      }
                  },
                  plotOptions: {
                      pie: {
                          dataLabels: {
                              enabled: true,
                              distance: -50,
                              style: {
                                  fontWeight: 'bold',
                                  color: 'white'
                              }
                          },
                          // center: ['50%', '75%'],
                          size: '100%'
                      }
                  },
                  series: [{
                      type: 'pie',
                      name: 'Percentage',
                      innerSize: '80%',
                      data: [
                          ['', this.statusSelectedAndDateSelectedIncidentRequest],
                          ['', this.totalIncidentRequest-this.statusSelectedAndDateSelectedIncidentRequest]
                      ]
                  }]
              } as any);
              chart_lost_opp.reflow();
              }
            );
            }else{
              this.totalIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
              // this.getIncidentRequestFilter('Closed');
            }
          }
        );
  }

  getIncidentRequestFilter(status: any){
    var status = status.target.value;
    var data : any;
    if(this.userDetails.role == 'admin'){
      data = {
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
              "Instance": 'IT',
              "Status":status,
              "strUpdatedFromDate":'',
              "strUpdatedToDate":'',
              "IsWebServiceRequest": true
            }
          }
        };
      }else{
        data = { 
              "ServiceName": "IM_GetMyIncidents", 
              "objCommonParameters": { 
              "IncidentParam": { 
                "CurrentPageIndex": 0, 
                "Status": status, 
                "PageSize": 20, 
                "Caller":3653
              }, 
              "_ProxyDetails": { 
              "TokenID": "", 
              "OrgID": "1", 
              "ReturnType": "JSON", 
              "Password": "N@12678%$#@*ec", 
              "UserName": "symphony.api@india.nec.com", 
              "ProxyID": 0}, 
              "InstanceCode": "IT"
              }
        };
      }

      this.dataService.getIncidentsTickets(data).subscribe(
        res => {
          if(res.OutputObject.MyTickets.length > 0){
            this.statusSelectedAndDateSelectedIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
          }else{
            this.statusSelectedAndDateSelectedIncidentRequest = '0';
          }
          if(this.statusSelectedAndDateSelectedIncidentRequest > 0){
            this.showPie = true;
            this.showMessage = false;
              const chart_lost_opp = Highcharts.chart('chart-pie-lost-opp', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                colors: ['rgb(166, 166, 205)', 'rgb(238, 238, 238)'],
                title: {
                    text: '<b>'+status + '<br>'+ ((this.statusSelectedAndDateSelectedIncidentRequest/this.totalIncidentRequest)*100).toFixed(2)+'%</b>',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 10
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        // center: ['50%', '75%'],
                        size: '100%'
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Percentage',
                    innerSize: '80%',
                    data: [
                        ['', this.statusSelectedAndDateSelectedIncidentRequest],
                        ['', this.totalIncidentRequest-this.statusSelectedAndDateSelectedIncidentRequest]
                    ]
                }]
            } as any);
            chart_lost_opp.reflow();
          }else{
            this.showPie = false;
            this.showMessage = true;
          }
        }
      );
  }

  getStatusServiceRequest(status: string) {
    let data = {
      "ServiceName": "SR_GetServiceRequestListDetails",
      "objCommonParameters": {
        "_ProxyDetails":{
        "ReturnType": "JSON",
        "Password": "N@12678%$#@*ec",
        "UserName": "symphony.api@india.nec.com",
        "ProxyID": 0
        },
        "objSR_SearchFilterParam": {
          "Executive": 1,
          "WorkgroupName": "",
          "CurrentPageIndex": 0,
          "PageSize": 0,
          "OrgID": "1",
          "Instance": 'IT',
          "Status": status,
          "strUpdatedFromDate": '',
          "strUpdatedToDate": '',
          "IsWebServiceRequest": true,
          "Catalog": null,
          "CatalogName": "",
          "IncludeCatalogAttributes": true
        }
      }
    }

      this.dataService.getIncidentsTickets(data).subscribe(
        res => {
          if(status == 'Closed'){
            this.closedServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].SRDetail[0].TotalRows : 0;
          }else if(status == 'Open'){
            this.openServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].SRDetail[0].TotalRows : 0;
          }else if(status == 'Pending'){
            this.pendingServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].SRDetail[0].TotalRows : 0;
          }else if(status == 'Reopened'){
            this.reopenedServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].SRDetail[0].TotalRows : 0;
          }else if(status == 'New'){
            this.newServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].SRDetail[0].TotalRows : 0;
          }else if(status == 'Assigned'){
            this.assignedServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].SRDetail[0].TotalRows : 0;
          }else if(status == 'Resolved'){
            this.resolvedServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].SRDetail[0].TotalRows : 0;
          }else if(status == 'Cancelled'){
            this.cancelledServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].SRDetail[0].TotalRows : 0;
          }else if(status == 'In-Progress'){
            this.inprogressServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].SRDetail[0].TotalRows : 0;
          }

          if(this.closedServices >= 0 && this.openServices >= 0 && this.pendingServices >= 0 && this.reopenedServices >= 0 &&this.newServices >= 0 && this.assignedServices >= 0 && this.resolvedServices >= 0 && this.cancelledServices >= 0 && this.inprogressServices >= 0){
            const status_wise_sr = Highcharts.chart('status-wise-sr', {
              chart: {
                type: 'column'
              },
              title: {
                  text: ''
              },
              colors: ['rgb(166, 166, 205)'],
              yAxis: {
                  title: {
                      text: 'Number'
                  },
                  type: 'logarithmic',
                  minorTickInterval: 100,
                  stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold'
                    }
                }
              },
              xAxis: {
                  categories: ["Closed", "Open", "Pending", "Reopened", "New", "Assigned", "Resolved", "Cancelled", "In-Progress"]
              },
              tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
              },
              series: [{
                  name: 'Services',
                  data: [this.closedServices, this.openServices, this.pendingServices, this.reopenedServices, this.newServices, this.assignedServices, this.resolvedServices, this.cancelledServices, this.inprogressServices]
              }],
              responsive: {
                  rules: [{
                      condition: {
                          maxWidth: 500
                      },
                      chartOptions: {
                          legend: {
                              layout: 'horizontal',
                              align: 'center',
                              verticalAlign: 'bottom'
                          }
                      }
                  }]
              }
            
            } as any);
            status_wise_sr.reflow();
          }
        }
      );
  }

  getServiceRequest(bu: any, startDate: any, endDate: any, status: any) {
    let data = {
      "ServiceName": "SR_GetServiceRequestListDetails",
      "objCommonParameters": {
        "_ProxyDetails":{
        "ReturnType": "JSON",
        "Password": "N@12678%$#@*ec",
        "UserName": "symphony.api@india.nec.com",
        "ProxyID": 0
        },
        "objSR_SearchFilterParam": {
          "Executive": 1,
          "WorkgroupName": "",
          "CurrentPageIndex": 0,
          "PageSize": 0,
          "OrgID": "1",
          "Instance":  bu,
          "Status": status,
          "strUpdatedFromDate": startDate,
          "strUpdatedToDate": endDate,
          "IsWebServiceRequest": true,
          "Catalog": null,
          "CatalogName": "",
          "IncludeCatalogAttributes": true
        }
      }
    };

      this.dataService.getIncidentsTickets(data).subscribe(
        res => {
          console.log("SR")
          console.log(res)
          if(status ===  'Open') {
          this.totalOpenStatusServiceRequest = res.OutputObject.MyTickets[0].SRDetail[0].TotalRows;
          }
          else if(status ===  'Closed') {
          this.totalClosedStatusServiceRequest = res.OutputObject.MyTickets[0].SRDetail[0].TotalRows;
          this.dataService.getIncidentsTickets(data).subscribe(
            res => {
              if(res.OutputObject.MyTickets.length > 0){
                this.statusSelectedAndDateSelectedServiceRequest = res.OutputObject.MyTickets[0].SRDetail[0].TotalRows;
              }else{
                this.statusSelectedAndDateSelectedServiceRequest = '0';
              }
              const chart_lost_opp = Highcharts.chart('it-sr', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                colors: ['rgb(166, 166, 205)', 'rgb(238, 238, 238)'],
                title: {
                    text: '<b>'+status + '<br>'+ ((this.statusSelectedAndDateSelectedServiceRequest/this.totalServiceRequest)*100).toFixed(2)+'%</b>',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 10
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        // center: ['50%', '75%'],
                        size: '100%'
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Percentage',
                    innerSize: '80%',
                    data: [
                        ['', this.statusSelectedAndDateSelectedServiceRequest],
                        ['', this.totalServiceRequest-this.statusSelectedAndDateSelectedServiceRequest]
                    ]
                }]
            } as any);
            chart_lost_opp.reflow();
            }
          );
          }else{
            this.totalServiceRequest = res.OutputObject.MyTickets[0].SRDetail[0].TotalRows;
            this.getServiceRequestFilter('Closed');
          }
        }
      );
  }

  getServiceRequestFilter(status: any){
    var status = status.target.value;
    let data = {
      "ServiceName": "SR_GetServiceRequestListDetails",
      "objCommonParameters": {
        "_ProxyDetails":{
        "ReturnType": "JSON",
        "Password": "N@12678%$#@*ec",
        "UserName": "symphony.api@india.nec.com",
        "ProxyID": 0
        },
        "objSR_SearchFilterParam": {
          "Executive": 1,
          "WorkgroupName": "",
          "CurrentPageIndex": 0,
          "PageSize": 0,
          "OrgID": "1",
          "Instance": 'IT',
          "Status": status,
          "strUpdatedFromDate": '',
          "strUpdatedToDate":'',
          "IsWebServiceRequest": true,
          "Catalog": null,
          "CatalogName": "",
          "IncludeCatalogAttributes": true
        }
      }
    }

      this.dataService.getIncidentsTickets(data).subscribe(
        res => {
          if(res.OutputObject.MyTickets.length > 0){
            this.statusSelectedAndDateSelectedServiceRequest = res.OutputObject.MyTickets[0].SRDetail[0].TotalRows;
          }else{
            this.statusSelectedAndDateSelectedServiceRequest = '0';
          }
          if(this.statusSelectedAndDateSelectedServiceRequest > 0){
            this.showPie = true;
            this.showMessage = false;
              const chart_lost_opp = Highcharts.chart('it-sr', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                colors: ['rgb(166, 166, 205)', 'rgb(238, 238, 238)'],
                title: {
                    text: '<b>'+status + '<br>'+ ((this.statusSelectedAndDateSelectedServiceRequest/this.totalServiceRequest)*100).toFixed(2)+'%</b>',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 10
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        // center: ['50%', '75%'],
                        size: '50%'
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Percentage',
                    innerSize: '80%',
                    data: [
                        ['', this.statusSelectedAndDateSelectedServiceRequest],
                        ['', this.totalServiceRequest-this.statusSelectedAndDateSelectedServiceRequest]
                    ]
                }]
            } as any);
            chart_lost_opp.reflow();
          }else{
            this.showPie = false;
            this.showMessage = true;
          }
        }
      );
  }


}
