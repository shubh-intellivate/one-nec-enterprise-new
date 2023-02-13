import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // baseurl = 'https://ntichikettoseva.nectechnologies.in/Chat_Api/REST/Summit_RESTWCF.svc/RESTService/CommonWS_JsonObjCall';
  baseurl = 'https://summituat.nectechnologies.in/chatbot/REST/Summit_RESTWCF.svc/RESTService/CommonWS_JsonObjCall';
  baseUrl_int = 'https://neciapi.nectechnologies.in:6443/api/';
  private userDetails: any;

  constructor(private http: HttpClient) { }

  setUserDetails(details:any) {
    this.userDetails = details;
  }

  getSavedUserDetails():any{
    return this.userDetails;
  }

  public getLmsTrainings(user:any, role:any): Observable<any> {
    return this.http.get(this.baseUrl_int+'/values/GetUserDetailsByUserName?username=komal.takkar&role=user&toolname=lms')
    // return this.http.get(this.baseUrl_int+'/values/GetUserDetailsByUserName?'+'username='+user+'&role='+role+'&toolname=lms')
  }  

  public getCovidDetails(user:any, role:any): Observable<any> {
    return this.http.get(this.baseUrl_int+'/values/GetUserDetailsByUserName?username=pawan.kumar1&role=user&toolname=covidvaccinationdetails')
    // return this.http.get(this.baseUrl_int+'/values/GetUserDetailsByUserName?'+'username='+user+'&role='+role+'&toolname=covidvaccinationdetails')
  }  

  public getItTickets(postData: any): Observable<any> {
    // return this.http.post(environment.getItDetails, postData)
    return this.http.post(this.baseurl, postData)
  }

  public getIncidentsTickets(postData: any): Observable<any> {
    // return this.http.post(environment.getItDetails, postData)
    return this.http.post(this.baseurl, postData)
  }

  public getUserDetails(postData: any): Observable<any> {
    // return this.http.post(environment.getUserDetails, postData)
    return of({"UserName": "komal.takkar", "role": "admin", "UserID": 3653})
  }

  public getCabDetails(user: any, role: any): Observable<any> {
    return this.http.get(environment.necapi+'username='+user+'&role='+role+'&toolname=cab')
    // return this.http.get(this.baseUrl_int+'/values/GetUserDetailsByUserName?'+'username='+user+'&role='+role+'&toolname=cab')
  } 

  public getTravelDetails(user: any, role: any): Observable<any> {
    return this.http.get(environment.necapi+'username='+user+'&role='+role+'&toolname=travel')
    // return this.http.get(this.baseUrl_int+'/values/GetUserDetailsByUserName?'+'username='+user+'&role='+role+'&toolname=travel')
  } 

  public getExpenseDetails(user: any, role: any): Observable<any> {
    return this.http.get(environment.necapi+'username='+user+'&role='+role+'&toolname=expense')
    // return this.http.get(this.baseUrl_int+'/values/GetUserDetailsByUserName?'+'username='+user+'&role='+role+'&toolname=expense')
  } 

}