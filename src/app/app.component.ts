import { Component, OnInit } from '@angular/core';
import { DataService } from './providers/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component2.css']
})
export class AppComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    let data = {
      "_ProxyDetails": {
        "Password": "N@12678%$#@*ec",
        "UserName": "symphony.api@india.nec.com",
        "ProxyID": 0,
        "ReturnType": "JSON",
        "OrgID": 1
      },
      "objFilters": {
        "_emailID": "komal.takkar@india.nec.com",
        "_useID": 0,
        "_userName": "",
        "_customer": "",
        "_location": "",
        "_empID": "",
        "_ntI D": ""
      }
    };

    this.dataService.getUserDetails(data).subscribe(
      res => {
        console.log("User Data");
        console.log(res)
        this.dataService.setUserDetails(res);
        // console.log(res.Output.AllUserDetails.UserDetails.UserName);
      }
    );
  }
}
