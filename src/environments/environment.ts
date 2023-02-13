// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getItDetails:"/Chat_Api/REST/Summit_RESTWCF.svc/RESTService/CommonWS_JsonObjCall",
  getIncidentsDetails:"/Chat_Api/REST/Summit_RESTWCF.svc/RESTService/CommonWS_JsonObjCall",
  getUserDetails:"/Chat_Api/REST/Summit_RESTWCF.svc/RESTService/ADM_SearchAllUser",
  lmsTrainings: '/api/values/GetUserDetailsByUserName?username=komal.takkar&role=user&toolname=lms',
  covidDetails: '/api/values/GetUserDetailsByUserName?username=pawan.kumar1&role=user&toolname=covidvaccinationdetails',
  necapi: '/api/values/GetUserDetailsByUserName?'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
