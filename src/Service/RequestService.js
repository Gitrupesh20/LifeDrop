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
    return axios.get(
      AuthenticationService.API_URL + "/donations/requests/status",
      {
        headers: AuthenticationService.authHeader(),
      }
    );
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
