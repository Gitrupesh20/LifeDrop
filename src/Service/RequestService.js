import axios from "axios";
import AuthenticationService from "./AuthenticationService";
import { geocode } from "@esri/arcgis-rest-geocoding";
import { ApiKeyManager } from "@esri/arcgis-rest-request";

const apiKey =
  "AAPK410c517cc3174e78b73dd3a45ad6fe23uqmE4L_htiaaSZO1LFRKWKO4X6AJarvLJVqtBz2I0JrVAsh3cY29a6Cme5B6SohU";
const authentication = ApiKeyManager.fromKey(apiKey);

class RequestService {
  getRecivedRequest() {
    return axios.get(AuthenticationService.API_URL + "/donors/requests", {
      headers: AuthenticationService.authHeader(),
    });
  }

  getRequestsStatus() {
    return axios.get(AuthenticationService.API_URL + "/donations/requests", {
      headers: AuthenticationService.authHeader(),
    });
    const send_request_status = [
      {
        name: "Abhinav Raj Singh",
        bloodGroup: "A+",
        gender: "Male",
        status: "Pending",
        address: "Khajuri Khas Delhi 110094",
      },
      {
        name: "Rupesh Kr Sharma",
        bloodGroup: "B+",
        gender: "Male",
        status: "Approved",
        address: "Burari, North delhi, Delhi 110084",
      },
      {
        name: "Roshan Singh Rajput",
        bloodGroup: "O+",
        gender: "Male",
        status: "Rejected",
        address: "Tis Hazari, North Delhi,Delhi 110054",
      },
      {
        name: "Kishan Kumar Tiwari",
        bloodGroup: "A+",
        gender: "Male",
        status: "Pending",
        address: "Rohini Sec:7, North delhi, Delhi 110085",
      },
    ];

    return send_request_status;
  }

  getGeoCode(address) {
    // return geocode({ address: address, authentication: authentication});
    // .then(response => {
    //      console.log(response.candidates[0].location)
    //  return response.candidates[0].location;     // => { x: -77.036533, y: 38.898719, spatialReference: ... }
    //  })
  }
}

export default new RequestService();
