import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import Drilldown from 'highcharts/modules/drilldown';
import { DataService } from '../providers/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit  {
  title = 'nec-ui';
  adminIncidents: any;
  hrInicdents: any;
  itIncidents: any;
  totalDayCabs: any;
  totalEveningCabs: any;
  totalApprovedCabs: any;
  totalAutoApprovedCabs: any;
  totalCancelledCabs: any;
  totalRejectedCabs: any;
  totalPendingCabs: any;

  totalDomesticTravel: any;
  totalInternationalTravel: any;
  totalBillableTravel: any;
  totalNonBillableTravel: any;
  totalApprovedTravel: any;
  totalPendingTravel: any;
  totalRejectedTravel: any;
  totalReviewTravel: any;

  showPie: boolean = true;
  showMessage: boolean = false;

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
  closedIncidents: any;
  openIncidents: any;
  pendingIncidents: any;
  reopenedIncidents: any;
  newIncidents: any;
  assignedIncidents: any;
  resolvedIncidents: any;
  cancelledIncidents: any;
  inprogressIncidents: any;

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
  closedServices: any;
  openServices: any;
  pendingServices: any;
  reopenedServices: any;
  newServices: any;
  assignedServices: any;
  resolvedServices: any;
  cancelledServices: any;
  inprogressServices: any;
  userRole: any;

  statusSelectedAndDateSelectedIncidentRequest: any;
  statusSelectedAndDateSelectedServiceRequest: any;

  incidentStatusProvider = [
    "Closed", "Open", "Reopened", "New", "Assigned", "In-Progress", "Pending", "Resolved", "Cancelled"
  ];
  userDetails: any;
  totalShuttleCabs: any;
  totalWeekendCabs: any;
  Total_Cab_Request_Ahmedabad: any;
  Total_Cab_Request_Bangalore: any;
  Total_Cab_Request_Bangalore_Unit: any;
  Total_Cab_Request_Chennai: any;
  Total_Cab_Request_Hubli: any;
  Total_Cab_Request_JBO_Unit: any;
  Total_Cab_Request_Mumbai: any;
  Total_Cab_Request_Non_SEZ_Unit: any;
  Total_Cab_Request_Pune: any;
  Total_Cab_Request_Qatar_Branch: any;
  Total_Cab_Request_SBO_Unit: any;
  Total_Cab_Request_SEZ_Unit_2: any;
  Total_Cab_Request_USBO_Unit: any;
  Total_Cab_Request_Surat: any;
  My_Total_Travel_Request: any;
  My_Total_Pending_Travel_Request: any;
  My_Total_Pending_Travel_Settlement: any;
  Total_Travel_Request: any;
  Total_Billable_Travel_Request: any;
  Total_Non_Billable_Travel_Request: any;
  Total_Travel_Request_Ahmedabad: any;
  Total_Travel_Request_Bangalore: any;
  Total_Travel_Request_Bangalore_Unit: any;
  Total_Travel_Request_Chennai: any;
  Total_Travel_Request_Hubli: any;
  Total_Travel_Request_JBO_Unit: any;
  Total_Travel_Request_Mumbai: any;
  Total_Travel_Request_Non_SEZ_Unit: any;
  Total_Travel_Request_Pune: any;
  Total_Travel_Request_Qatar_Branch: any;
  Total_Travel_Request_SBO_Unit: any;
  Total_Travel_Request_SEZ_Unit_2: any;
  Total_Travel_Request_USBO_Unit: any;
  Total_Travel_Request_Surat: any;
  Total_Domestic_Travel_Request: any;
  Total_International_Travel_Request: any;

  constructor(private dataService : DataService,public datepipe: DatePipe){
    this.userDetails = dataService.getSavedUserDetails();
    this.userRole = this.userDetails.role;
  }


  ngOnInit(){
    this.getCabDetails();
    this.getTravelDetails();
    
    this.getIncidentRequest('NECADM', '', '', '');
    this.getIncidentRequest('NECADM', '', '', 'Open');
    this.getIncidentRequest('NECADM', '', '', 'Closed');
    this.getStatusIncidentRequest('Open');
    this.getStatusIncidentRequest('Closed');
    this.getStatusIncidentRequest('New');
    this.getStatusIncidentRequest('Reopened');
    this.getStatusIncidentRequest('Assigned');
    this.getStatusIncidentRequest('In-Progress');
    this.getStatusIncidentRequest('Pending');
    this.getStatusIncidentRequest('Resolved');
    this.getStatusIncidentRequest('Cancelled');

    this.getServiceRequest('NECADM', '', '', '');
    this.getServiceRequest('NECADM', '', '', 'Open');
    this.getServiceRequest('NECADM', '', '', 'Closed');
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

  getCabDetails(){
    this.dataService.getCabDetails(this.userDetails.UserName, this.userDetails.role).subscribe(
      res => {
        var response = res[0];
        if(this.userDetails.role == 'user'){
          this.totalCabRequests = response.My_Total_Cab_Request;
          this.totalDayCabs = response.My_Total_Day_Cabs;
          this.totalEveningCabs = response.My_Total_Evening_Cabs;
          this.totalShuttleCabs = response.My_Total_Shuttle_Cabs;
          this.totalWeekendCabs = response.My_Total_Weekend_Cabs;
          this.totalApprovedCabs = response.My_Total_Approved_Cabs;
          this.totalAutoApprovedCabs = response.My_Total_Auto_Approved_Cabs;
          this.totalPendingCabs = response.My_Total_Pending_Cabs;
          this.totalCancelledCabs = response.My_Total_Cancelled_Cabs;
          this.totalRejectedCabs = response.My_Total_Rejected_Cabs;
        }else{
          this.totalCabRequests = response.Total_Cab_Request;
          this.totalShuttleCabs = response.Total_Cab_Request;
          this.totalWeekendCabs = response.Total_Cab_Request;
          this.totalDayCabs = response.Total_Day_Cabs;
          this.totalEveningCabs = response.Total_Evening_Cabs;
          this.totalApprovedCabs = response.Total_Approved_Cabs;
          this.totalAutoApprovedCabs = response.Total_Auto_Approved_Cabs;
          this.totalPendingCabs = response.Total_Pending_Cabs;
          this.totalCancelledCabs = response.Total_Cancelled_Cabs;
          this.totalRejectedCabs = response.Total_Rejected_Cabs;

          this.Total_Cab_Request_Ahmedabad = parseInt(response.Total_Cab_Request_Ahmedabad);
          this.Total_Cab_Request_Bangalore = parseInt(response.Total_Cab_Request_Bangalore);
          this.Total_Cab_Request_Bangalore_Unit = parseInt(response. Total_Cab_Request_Bangalore_Unit);
          this.Total_Cab_Request_Chennai = parseInt(response.Total_Cab_Request_Chennai);
          this.Total_Cab_Request_Hubli = parseInt(response.Total_Cab_Request_Hubli);
          this.Total_Cab_Request_JBO_Unit = parseInt(response.Total_Cab_Request_JBO_Unit);
          this.Total_Cab_Request_Mumbai = parseInt(response.Total_Cab_Request_Mumbai);
          this.Total_Cab_Request_Non_SEZ_Unit = parseInt(response.Total_Cab_Request_Non_SEZ_Unit);
          this.Total_Cab_Request_Pune = parseInt(response.Total_Cab_Request_Pune);
          this.Total_Cab_Request_Qatar_Branch = parseInt(response.Total_Cab_Request_Qatar_Branch);
          this.Total_Cab_Request_SBO_Unit = parseInt(response.Total_Cab_Request_SBO_Unit);
          this.Total_Cab_Request_SEZ_Unit_2 = parseInt(response.Total_Cab_Request_SEZ_Unit_2);
          this.Total_Cab_Request_USBO_Unit = parseInt(response.Total_Cab_Request_USBO_Unit);
          this.Total_Cab_Request_Surat = parseInt(response.Total_Cab_Request_Surat);
        }
        const cab_requests = Highcharts.chart('cab-requests', {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: 0,
              plotShadow: false
          },
          colors: ['rgb(166, 166, 205)', 'rgb(163,161,249)'],
          title: {
              text: '',
              align: 'center',
              verticalAlign: 'middle',
              y: 10
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          plotOptions: {
              pie: {
                  dataLabels: {
                      enabled: false,
                      // distance: -50,
                      style: {
                          fontWeight: 'bold',
                          color: 'white'
                      }
                  },
                  showInLegend: true,
                  // center: ['50%', '75%'],
                  size: '100%'
              }
          },
          series: [{
              type: 'pie',
              name: 'Percentage',
              innerSize: '80%',
              data: [
                  ['Day Cabs', parseInt(this.totalDayCabs)],
                  ['Evening Cabs', parseInt(this.totalEveningCabs)],
                  ['Shuttle Cabs', parseInt(this.totalShuttleCabs)],
                  ['Weekend Cabs', parseInt(this.totalWeekendCabs)]
              ]
          }]
        } as any);

        const cab_status = Highcharts.chart('cab-status', {
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
              }
          },
          xAxis: {
              categories: ['Approved','Auto-Approved','Pending', 'Rejected', 'Cancelled']
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
          },
          series: [{
              name: 'Cabs',
              data: [parseInt(this.totalApprovedCabs), parseInt(this.totalAutoApprovedCabs), parseInt(this.totalPendingCabs), parseInt(this.totalRejectedCabs), parseInt(this.totalRejectedCabs)]
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

        if(this.userRole == 'admin'){
          const cab_status = Highcharts.chart('cab-status-location', {
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
                }
            },
            xAxis: {
                categories: ['Ahmedabad','Bangalore','Bangalore Unit', 'Chennai', 'Hubli', 'JBO Unit','Mumbai','Non-SEZ Unit', 'Pune', 'Qatar Branch', 'SBO Unit','SEZ Unit 2', 'USBO Unit', 'Surat']
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            series: [{
                name: 'Cabs',
                data: [this.Total_Cab_Request_Ahmedabad, this.Total_Cab_Request_Bangalore, this.Total_Cab_Request_Bangalore_Unit, this.Total_Cab_Request_Chennai, this.Total_Cab_Request_Hubli, this.Total_Cab_Request_JBO_Unit, this.Total_Cab_Request_Mumbai, this.Total_Cab_Request_Non_SEZ_Unit, this.Total_Cab_Request_Pune, this.Total_Cab_Request_Qatar_Branch, this.Total_Cab_Request_SBO_Unit, this.Total_Cab_Request_SEZ_Unit_2, this.Total_Cab_Request_USBO_Unit, this.Total_Cab_Request_Surat]
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
        }
        cab_requests.reflow();
        cab_status.reflow();
      }
    );
  }

  getTravelDetails(){
    this.dataService.getTravelDetails(this.userDetails.UserName, this.userDetails.role).subscribe(
      res => {
        console.log("travel")
        console.log(res)
        var response = res[0];
        if(this.userRole == 'user'){
          this.My_Total_Travel_Request = parseInt(response.My_Total_Travel_Request);
          this.My_Total_Pending_Travel_Request = parseInt(response.My_Total_Pending_Travel_Request);
          this.My_Total_Pending_Travel_Settlement = parseInt(response.My_Total_Pending_Travel_Settlement);
        }else{
          this.Total_Travel_Request = parseInt(response.Total_Travel_Request);
          this.Total_Billable_Travel_Request = parseInt(response.Total_Billable_Travel_Request);
          this.Total_Non_Billable_Travel_Request = parseInt(response.Total_Non_Billable_Travel_Request);
          this.Total_Domestic_Travel_Request = parseInt(response.Total_Domestic_Travel_Request);
          this.Total_International_Travel_Request = parseInt(response.Total_International_Travel_Request);
          this.Total_Travel_Request_Ahmedabad = parseInt(response.Total_Travel_Request_Ahmedabad);
          this.Total_Travel_Request_Bangalore = parseInt(response.Total_Travel_Request_Bangalore);
          this.Total_Travel_Request_Bangalore_Unit = parseInt(response.Total_Travel_Request_Bangalore_Unit);
          this.Total_Travel_Request_Chennai = parseInt(response.Total_Travel_Request_Chennai);
          this.Total_Travel_Request_Hubli = parseInt(response.Total_Travel_Request_Hubli);
          this.Total_Travel_Request_JBO_Unit = parseInt(response.Total_Travel_Request_JBO_Unit);
          this.Total_Travel_Request_Mumbai = parseInt(response.Total_Travel_Request_Mumbai);
          this.Total_Travel_Request_Non_SEZ_Unit = parseInt(response.Total_Travel_Request_Non_SEZ_Unit);
          this.Total_Travel_Request_Pune = parseInt(response.Total_Travel_Request_Pune);
          this.Total_Travel_Request_Qatar_Branch = parseInt(response.Total_Travel_Request_Qatar_Branch);
          this.Total_Travel_Request_SBO_Unit = parseInt(response.Total_Travel_Request_SBO_Unit);
          this.Total_Travel_Request_SEZ_Unit_2 = parseInt(response.Total_Travel_Request_SEZ_Unit_2);
          this.Total_Travel_Request_USBO_Unit = parseInt(response.Total_Travel_Request_USBO_Unit);
          this.Total_Travel_Request_Surat = parseInt(response.Total_Travel_Request_Surat);

          const travel_requests_domestic = Highcharts.chart('travel-requests-domestic', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            colors: ['rgb(166, 166, 205)', 'rgb(163,161,249)'],
            title: {
                text: '',
                align: 'center',
                verticalAlign: 'middle',
                y: 10
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    showInLegend: true,
                    // center: ['50%', '75%'],
                    size: '100%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Percentage',
                innerSize: '80%',
                data: [
                    ['Domestic Travel', this.Total_Domestic_Travel_Request],
                    ['International Travel', this.Total_International_Travel_Request]
                ]
            }]
          } as any);
          const travel_requests_bill = Highcharts.chart('travel-requests-bill', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            colors: ['rgb(166, 166, 205)', 'rgb(163,161,249)'],
            title: {
                text: '',
                align: 'center',
                verticalAlign: 'middle',
                y: 10
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false,
                        distance: 0,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    showInLegend: true,
                    // center: ['50%', '75%'],
                    size: '100%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Percentage',
                innerSize: '80%',
                data: [
                    ['Billable Travel', this.Total_Billable_Travel_Request],
                    ['Non-Billable Travel', this.Total_Non_Billable_Travel_Request]
                ]
            }]
          } as any);
          const travel_status = Highcharts.chart('travel-status', {
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
                }
            },
            xAxis: {
                categories: ['Ahmedabad','Bangalore','Bangalore Unit', 'Chennai', 'Hubli', 'JBO Unit','Mumbai','Non-SEZ Unit', 'Pune', 'Qatar Branch', 'SBO Unit','SEZ Unit 2', 'USBO Unit', 'Surat']
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            series: [{
                name: 'Travel',
                data: [this.Total_Travel_Request_Ahmedabad, this.Total_Travel_Request_Bangalore, this.Total_Travel_Request_Bangalore_Unit, this.Total_Travel_Request_Chennai, this.Total_Travel_Request_Hubli, this.Total_Travel_Request_JBO_Unit, this.Total_Travel_Request_Mumbai, this.Total_Travel_Request_Non_SEZ_Unit, this.Total_Travel_Request_Pune, this.Total_Travel_Request_Qatar_Branch, this.Total_Travel_Request_SBO_Unit, this.Total_Travel_Request_SEZ_Unit_2, this.Total_Travel_Request_USBO_Unit, this.Total_Travel_Request_Surat]
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
        }
        
      }
    );
  }

  getStatusIncidentRequest(status: string) {
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
              "Instance": "NECADM",
              "Status":status,
              "strUpdatedFromDate": '',
              "strUpdatedToDate": '',
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
          "Caller":this.userDetails.UserID
        }, 
        "_ProxyDetails": { 
        "TokenID": "", 
        "OrgID": "1", 
        "ReturnType": "JSON", 
        "Password": "N@12678%$#@*ec", 
        "UserName": "symphony.api@india.nec.com", 
        "ProxyID": 0}, 
        "InstanceCode": "NECADM"
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
          "Caller":this.userDetails.UserID
        }, 
        "_ProxyDetails": { 
        "TokenID": "", 
        "OrgID": "1", 
        "ReturnType": "JSON", 
        "Password": "N@12678%$#@*ec", 
        "UserName": "symphony.api@india.nec.com", 
        "ProxyID": 0}, 
        "InstanceCode": bu
        }
      };
    }
  
        this.dataService.getIncidentsTickets(data).subscribe(
          res => {
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
              this.getStatusIncidentRequest('Closed');
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
              "Instance": "NECADM",
              "Status":status,
              "strUpdatedFromDate": '',
              "strUpdatedToDate": '',
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
          "Caller":this.userDetails.UserID
        }, 
        "_ProxyDetails": { 
        "TokenID": "", 
        "OrgID": "1", 
        "ReturnType": "JSON", 
        "Password": "N@12678%$#@*ec", 
        "UserName": "symphony.api@india.nec.com", 
        "ProxyID": 0}, 
        "InstanceCode": "NECADM"
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
                        size: '50%'
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
          if(status ===  'Open') {
          this.totalOpenStatusServiceRequest = res.OutputObject.MyTickets[0].TotalRows;
          }
          else if(status ===  'Closed') {
          this.totalClosedStatusServiceRequest = res.OutputObject.MyTickets[0].TotalRows;
          this.dataService.getIncidentsTickets(data).subscribe(
            res => {
              if(res.OutputObject.MyTickets.length > 0){
                this.statusSelectedAndDateSelectedServiceRequest = res.OutputObject.MyTickets[0].TotalRows;
              }else{
                this.statusSelectedAndDateSelectedServiceRequest = '0';
              }
              const chart_lost_opp = Highcharts.chart('chart-pie-sr', {
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
            this.totalServiceRequest = res.OutputObject.MyTickets[0].TotalRows;
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
          "Instance": 'NECADM',
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
            this.statusSelectedAndDateSelectedServiceRequest = res.OutputObject.MyTickets[0].TotalRows;
          }else{
            this.statusSelectedAndDateSelectedServiceRequest = '0';
          }
          if(this.statusSelectedAndDateSelectedServiceRequest > 0){
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
          "Instance": 'NECADM',
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
            this.closedServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Open'){
            this.openServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Pending'){
            this.pendingServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Reopened'){
            this.reopenedServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'New'){
            this.newServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Assigned'){
            this.assignedServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Resolved'){
            this.resolvedServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'Cancelled'){
            this.cancelledServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
          }else if(status == 'In-Progress'){
            this.inprogressServices = res.OutputObject.MyTickets[0] ? res.OutputObject.MyTickets[0].TotalRows : 0;
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
}
