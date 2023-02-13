import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import Drilldown from 'highcharts/modules/drilldown';
import { DataService } from '../providers/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit  {
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

  ngOnInit(){
    this.getIncidentRequest('NECADM', '', '', '');
    this.getIncidentRequest('NECADM', '', '', 'Open');
    this.getIncidentRequest('NECADM', '', '', 'Closed');
    this.getBuWiseIncidents();
    // this.getCovidCabDetails();
  }

  getBuWiseIncidents(){
    this.getBUIncidentRequest('NECADM', '', '', '');
    this.getBUIncidentRequest('NEC-HR', '', '', '');
    this.getBUIncidentRequest('IT', '', '', '');
  }

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
  incidentStatusProvider = [
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


  getBUIncidentRequest(bu: any, startDate: any, endDate: any, status: any) {
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
            "Instance": bu,
            "Status":status,
            "strUpdatedFromDate": startDate,
            "strUpdatedToDate": endDate,
            "IsWebServiceRequest": true
          }
        }
      };

      this.dataService.getIncidentsTickets(data).subscribe(
        res => {
          if(bu ===  'NECADM') {
            this.adminIncidents = res.OutputObject.MyTickets[0].TotalRows;
          }
          else if(bu ===  'NEC-HR') {
            this.hrInicdents = res.OutputObject.MyTickets[0].TotalRows;
          }else if(bu ===  'IT') {
            this.itIncidents = res.OutputObject.MyTickets[0].TotalRows;
          }
          const bu_wise = Highcharts.chart('bu-wise', {
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
                categories: ['Admin','HR','IT']
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            series: [{
                name: 'Incidents',
                data: [this.adminIncidents, this.hrInicdents, this.itIncidents]
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
          bu_wise.reflow();
        }
      );
}

  getIncidentRequest(bu: any, startDate: any, endDate: any, status: any) {
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
              "Instance": bu,
              "Status":status,
              "strUpdatedFromDate": startDate,
              "strUpdatedToDate": endDate,
              "IsWebServiceRequest": true
            }
          }
        };
  
        this.dataService.getIncidentsTickets(data).subscribe(
          res => {
            if(status ===  'Open') {
            this.totalOpenStatusIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
            }
            else if(status ===  'Closed') {
            this.totalClosedStatusIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
            }else{
              this.totalIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
              this.getIncidentRequestFilter('NECADM', '', '', 'Closed');
            }
          }
        );
  }

  getIncidentRequestFilter(bu: any, incidentFromDate: any, incidenToDate: any, status: any){
    if(incidentFromDate==null){
      incidentFromDate="";
    }else{
      incidentFromDate = this.datepipe.transform(incidentFromDate, 'yyyy-MM-dd');
    }
    if(incidenToDate==null){
      incidenToDate="";
    }else{
      incidenToDate = this.datepipe.transform(incidenToDate, 'yyyy-MM-dd');
    }

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
            "Instance": bu,
            "Status":status,
            "strUpdatedFromDate":incidentFromDate,
            "strUpdatedToDate":incidenToDate,
            "IsWebServiceRequest": true
          }
        }
      };

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
        }
      );
  }

  getBUServiceRequest(bu: any, startDate: any, endDate: any, status: any) {
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
            "Instance": bu,
            "Status":status,
            "strUpdatedFromDate": startDate,
            "strUpdatedToDate": endDate,
            "IsWebServiceRequest": true
          }
        }
      };

      this.dataService.getIncidentsTickets(data).subscribe(
        res => {
          if(bu ===  'NECADM') {
            this.adminIncidents = res.OutputObject.MyTickets[0].TotalRows;
          }
          else if(bu ===  'NEC-HR') {
            this.hrInicdents = res.OutputObject.MyTickets[0].TotalRows;
          }else if(bu ===  'IT') {
            this.itIncidents = res.OutputObject.MyTickets[0].TotalRows;
          }
          const bu_wise = Highcharts.chart('bu-wise', {
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
                categories: ['Admin','HR','IT']
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            series: [{
                name: 'Incidents',
                data: [this.adminIncidents, this.hrInicdents, this.itIncidents]
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
          bu_wise.reflow();
        }
      );
}

  getServiceRequest(bu: any, startDate: any, endDate: any, status: any) {
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
              "Instance": bu,
              "Status":status,
              "strUpdatedFromDate": startDate,
              "strUpdatedToDate": endDate,
              "IsWebServiceRequest": true
            }
          }
        };
  
        this.dataService.getIncidentsTickets(data).subscribe(
          res => {
            if(status ===  'Open') {
            this.totalOpenStatusIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
            }
            else if(status ===  'Closed') {
            this.totalClosedStatusIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
            }else{
              this.totalIncidentRequest = res.OutputObject.MyTickets[0].TotalRows;
              this.getIncidentRequestFilter('NECADM', '', '', 'Closed');
            }
          }
        );
  }

  getServiceRequestFilter(bu: any, incidentFromDate: any, incidenToDate: any, status: any){
    if(incidentFromDate==null){
      incidentFromDate="";
    }else{
      incidentFromDate = this.datepipe.transform(incidentFromDate, 'yyyy-MM-dd');
    }
    if(incidenToDate==null){
      incidenToDate="";
    }else{
      incidenToDate = this.datepipe.transform(incidenToDate, 'yyyy-MM-dd');
    }

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
            "Instance": bu,
            "Status":status,
            "strUpdatedFromDate":incidentFromDate,
            "strUpdatedToDate":incidenToDate,
            "IsWebServiceRequest": true
          }
        }
      };

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
        }
      );
  }
}
