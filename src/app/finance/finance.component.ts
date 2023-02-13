import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import Drilldown from 'highcharts/modules/drilldown';
import { DataService } from '../providers/data.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})

export class FinanceComponent implements OnInit  {
  title = 'nec-ui';

  userDetails: any;
  userRole: any;
  My_Total_Mobile_Broadband_Request: any;
  My_Total_Other_Expense_Request: any;
  My_Total_Mobile_Broadband_Amount_Disbursed_Request: any;
  My_Total_Mobile_Broadband_Pending_Request: any;
  My_Total_Mobile_Broadband_ReferBack_Request: any;
  My_Total_Mobile_Broadband_Rejected_Request: any;
  My_Total_Other_Expense_Amount_Disbursed_Request: any;
  My_Total_Other_Expense_Pending_Request: any;
  My_Total_Other_Expense_ReferBack_Request: any;
  My_Total_Other_Expense_Rejected_Request: any;
  Total_Mobile_Broadband_Request: any;
  Total_Other_Expense_Request: any;
  Total_Mobile_Broadband_Amount_Disbursed_Request: any;
  Total_Mobile_Broadband_Pending_Request: any;
  Total_Mobile_Broadband_ReferBack_Request: any;
  Total_Mobile_Broadband_Rejected_Request: any;
  Total_Other_Expense_Amount_Disbursed_Request: any;
  Total_Other_Expense_Pending_Request: any;
  Total_Other_Expense_ReferBack_Request: any;
  Total_Other_Expense_Rejected_Request: any;
  Total_Mobile_Broadband_Expense_Request_Ahmedabad: any;
  Total_Mobile_Broadband_Expense_Request_Bangalore: any;
  Total_Mobile_Broadband_Expense_Request_Bangalore_Unit: any;
  Total_Mobile_Broadband_Expense_Request_Chennai: any;
  Total_Mobile_Broadband_Expense_Request_Hubli: any;
  Total_Mobile_Broadband_Expense_Request_JBO_Unit: any;
  Total_Mobile_Broadband_Expense_Request_Mumbai: any;
  Total_Mobile_Broadband_Expense_Request_Non_SEZ_Unit: any;
  Total_Mobile_Broadband_Expense_Request_Pune: any;
  Total_Mobile_Broadband_Expense_Request_Qatar_Branch: any;
  Total_Mobile_Broadband_Expense_Request_SBO_Unit: any;
  Total_Mobile_Broadband_Expense_Request_SEZ_Unit_2: any;
  Total_Mobile_Broadband_Expense_Request_USBO_Unit: any;
  Total_Mobile_Broadband_Expense_Request_Surat: any;
  Total_Other_Expense_Request_Ahmedabad: any;
  Total_Other_Expense_Request_Bangalore: any;
  Total_Other_Expense_Request_Bangalore_Unit: any;
  Total_Other_Expense_Request_Chennai: any;
  Total_Other_Expense_Request_Hubli: any;
  Total_Other_Expense_Request_JBO_Unit: any;
  Total_Other_Expense_Request_Mumbai: any;
  Total_Other_Expense_Request_Non_SEZ_Unit: any;
  Total_Other_Expense_Request_Pune: any;
  Total_Other_Expense_Request_Qatar_Branch: any;
  Total_Other_Expense_Request_SBO_Unit: any;
  Total_Other_Expense_Request_SEZ_Unit_2: any;
  Total_Other_Expense_Request_USBO_Unit: any;
  Total_Other_Expense_Request_Surat: any;

  constructor(private dataService : DataService,public datepipe: DatePipe){
    this.userDetails = dataService.getSavedUserDetails();
    this.userRole = this.userDetails.role;
  }

  ngOnInit(){
    this.getExpenseDetails();
  }

  getExpenseDetails(){
    this.dataService.getExpenseDetails(this.userDetails.UserName, this.userDetails.role).subscribe(
      res => {
        console.log("expense")
        console.log(res)
        var response = res[0];
        if(this.userRole == 'user'){
          this.My_Total_Mobile_Broadband_Request = parseInt(response.My_Total_Mobile_Broadband_Request);
          this.My_Total_Other_Expense_Request = parseInt(response.My_Total_Other_Expense_Request);
          this.My_Total_Mobile_Broadband_Amount_Disbursed_Request = parseInt(response.My_Total_Mobile_Broadband_Amount_Disbursed_Request);
          this.My_Total_Mobile_Broadband_Pending_Request = parseInt(response.My_Total_Mobile_Broadband_Pending_Request);
          this.My_Total_Mobile_Broadband_ReferBack_Request = parseInt(response.My_Total_Mobile_Broadband_ReferBack_Request);
          this.My_Total_Mobile_Broadband_Rejected_Request = parseInt(response.My_Total_Mobile_Broadband_Rejected_Request);
          this.My_Total_Other_Expense_Amount_Disbursed_Request = parseInt(response.My_Total_Other_Expense_Amount_Disbursed_Request);
          this.My_Total_Other_Expense_Pending_Request = parseInt(response.My_Total_Other_Expense_Pending_Request);
          this.My_Total_Other_Expense_ReferBack_Request = parseInt(response.My_Total_Other_Expense_ReferBack_Request);
          this.My_Total_Other_Expense_Rejected_Request = parseInt(response.My_Total_Other_Expense_Rejected_Request);
        }else{
          this.Total_Mobile_Broadband_Request = parseInt(response.Total_Mobile_Broadband_Request);
          this.Total_Other_Expense_Request = parseInt(response.Total_Other_Expense_Request);
          this.Total_Mobile_Broadband_Amount_Disbursed_Request = parseInt(response.Total_Mobile_Broadband_Amount_Disbursed_Request);
          this.Total_Mobile_Broadband_Pending_Request = parseInt(response.Total_Mobile_Broadband_Pending_Request);
          this.Total_Mobile_Broadband_ReferBack_Request = parseInt(response.Total_Mobile_Broadband_ReferBack_Request);
          this.Total_Mobile_Broadband_Rejected_Request = parseInt(response.Total_Mobile_Broadband_Rejected_Request);
          this.Total_Other_Expense_Amount_Disbursed_Request = parseInt(response.Total_Other_Expense_Amount_Disbursed_Request);
          this.Total_Other_Expense_Pending_Request = parseInt(response.Total_Other_Expense_Pending_Request);
          this.Total_Other_Expense_ReferBack_Request = parseInt(response.Total_Other_Expense_ReferBack_Request);
          this.Total_Other_Expense_Rejected_Request = parseInt(response.Total_Other_Expense_Rejected_Request);
          this.Total_Mobile_Broadband_Expense_Request_Ahmedabad = parseInt(response.Total_Mobile_Broadband_Expense_Request_Ahmedabad);
          this.Total_Mobile_Broadband_Expense_Request_Bangalore = parseInt(response.Total_Mobile_Broadband_Expense_Request_Bangalore);
          this.Total_Mobile_Broadband_Expense_Request_Bangalore_Unit = parseInt(response.Total_Mobile_Broadband_Expense_Request_Bangalore_Unit);
          this.Total_Mobile_Broadband_Expense_Request_Chennai = parseInt(response.Total_Mobile_Broadband_Expense_Request_Chennai);
          this.Total_Mobile_Broadband_Expense_Request_Hubli = parseInt(response.Total_Mobile_Broadband_Expense_Request_Hubli);
          this.Total_Mobile_Broadband_Expense_Request_JBO_Unit = parseInt(response.Total_Mobile_Broadband_Expense_Request_JBO_Unit);
          this.Total_Mobile_Broadband_Expense_Request_Mumbai = parseInt(response.Total_Mobile_Broadband_Expense_Request_Mumbai);
          this.Total_Mobile_Broadband_Expense_Request_Non_SEZ_Unit = parseInt(response.Total_Mobile_Broadband_Expense_Request_Non_SEZ_Unit);
          this.Total_Mobile_Broadband_Expense_Request_Pune = parseInt(response.Total_Mobile_Broadband_Expense_Request_Pune);
          this.Total_Mobile_Broadband_Expense_Request_Qatar_Branch = parseInt(response.Total_Mobile_Broadband_Expense_Request_Qatar_Branch);
          this.Total_Mobile_Broadband_Expense_Request_SBO_Unit = parseInt(response.Total_Mobile_Broadband_Expense_Request_SBO_Unit);
          this.Total_Mobile_Broadband_Expense_Request_SEZ_Unit_2 = parseInt(response.Total_Mobile_Broadband_Expense_Request_SEZ_Unit_2);
          this.Total_Mobile_Broadband_Expense_Request_USBO_Unit = parseInt(response.Total_Mobile_Broadband_Expense_Request_USBO_Unit);
          this.Total_Mobile_Broadband_Expense_Request_Surat = parseInt(response.Total_Mobile_Broadband_Expense_Request_Surat);
          this.Total_Other_Expense_Request_Ahmedabad = parseInt(response.Total_Other_Expense_Request_Ahmedabad);
          this.Total_Other_Expense_Request_Bangalore = parseInt(response.Total_Other_Expense_Request_Bangalore);
          this.Total_Other_Expense_Request_Bangalore_Unit = parseInt(response.Total_Other_Expense_Request_Bangalore_Unit);
          this.Total_Other_Expense_Request_Chennai = parseInt(response.Total_Other_Expense_Request_Chennai);
          this.Total_Other_Expense_Request_Hubli = parseInt(response.Total_Other_Expense_Request_Hubli);
          this.Total_Other_Expense_Request_JBO_Unit = parseInt(response.Total_Other_Expense_Request_JBO_Unit);
          this.Total_Other_Expense_Request_Mumbai = parseInt(response.Total_Other_Expense_Request_Mumbai);
          this.Total_Other_Expense_Request_Non_SEZ_Unit = parseInt(response.Total_Other_Expense_Request_Non_SEZ_Unit);
          this.Total_Other_Expense_Request_Pune = parseInt(response.Total_Other_Expense_Request_Pune);
          this.Total_Other_Expense_Request_Qatar_Branch = parseInt(response.Total_Other_Expense_Request_Qatar_Branch);
          this.Total_Other_Expense_Request_SBO_Unit = parseInt(response.Total_Other_Expense_Request_SBO_Unit);
          this.Total_Other_Expense_Request_SEZ_Unit_2 = parseInt(response.Total_Other_Expense_Request_SEZ_Unit_2);
          this.Total_Other_Expense_Request_USBO_Unit = parseInt(response.Total_Other_Expense_Request_USBO_Unit);
          this.Total_Other_Expense_Request_Surat = parseInt(response.Total_Other_Expense_Request_Surat);

          const expense_mobile_broadband = Highcharts.chart('expense-mobile-broadband', {
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
                    ['Amount Disbursed Request', this.Total_Mobile_Broadband_Amount_Disbursed_Request],
                    ['Pending Request', this.Total_Mobile_Broadband_Pending_Request],
                    ['ReferBack Request', this.Total_Mobile_Broadband_ReferBack_Request],
                    ['Rejected Request', this.Total_Mobile_Broadband_Rejected_Request]
                ]
            }]
          } as any);
          const expense_other_expense = Highcharts.chart('expense-other-expense', {
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
                    ['Amount Disbursed Request', this.Total_Other_Expense_Amount_Disbursed_Request],
                    ['Pending Request', this.Total_Other_Expense_Pending_Request],
                    ['ReferBack Request', this.Total_Other_Expense_ReferBack_Request],
                    ['Rejected Request', this.Total_Other_Expense_Rejected_Request]
                ]
            }]
          } as any);
          const mobile_broadband_by_units = Highcharts.chart('mobile-broadband-by-units', {
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
                name: 'Mobile Broadband',
                data: [this.Total_Mobile_Broadband_Expense_Request_Ahmedabad, this.Total_Mobile_Broadband_Expense_Request_Bangalore, this.Total_Mobile_Broadband_Expense_Request_Bangalore_Unit,this.Total_Mobile_Broadband_Expense_Request_Chennai ,this.Total_Mobile_Broadband_Expense_Request_Hubli, this.Total_Mobile_Broadband_Expense_Request_JBO_Unit, this.Total_Mobile_Broadband_Expense_Request_Mumbai, this.Total_Mobile_Broadband_Expense_Request_Non_SEZ_Unit, this.Total_Mobile_Broadband_Expense_Request_Pune, this.Total_Mobile_Broadband_Expense_Request_Qatar_Branch, this.Total_Mobile_Broadband_Expense_Request_SBO_Unit, this.Total_Mobile_Broadband_Expense_Request_SEZ_Unit_2, this.Total_Mobile_Broadband_Expense_Request_USBO_Unit, this.Total_Mobile_Broadband_Expense_Request_Surat]
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
          const other_expense_by_units = Highcharts.chart('other-expense-by-units', {
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
                name: 'Other Expense',
                data: [this.Total_Other_Expense_Request_Ahmedabad, this.Total_Other_Expense_Request_Bangalore, this.Total_Other_Expense_Request_Bangalore_Unit, this.Total_Other_Expense_Request_Chennai, this.Total_Other_Expense_Request_Hubli, this.Total_Other_Expense_Request_JBO_Unit, this.Total_Other_Expense_Request_Mumbai, this.Total_Other_Expense_Request_Non_SEZ_Unit, this.Total_Other_Expense_Request_Pune, this.Total_Other_Expense_Request_Qatar_Branch, this.Total_Other_Expense_Request_SBO_Unit, this.Total_Other_Expense_Request_SEZ_Unit_2, this.Total_Other_Expense_Request_USBO_Unit, this.Total_Other_Expense_Request_Surat]
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
          expense_mobile_broadband.reflow();
          expense_other_expense.reflow();
        }
        
      }
    );
  }
}
