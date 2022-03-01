import axios from 'axios';
import { Auth } from "aws-amplify";

const BASE_AWS_URL = "https://762h15kldb.execute-api.ca-central-1.amazonaws.com/dev";

// Singleton API - TODO: replace with better design after demo
class Service {
  private static instance: Service;
  private readonly baseURL: string = BASE_AWS_URL;

  private constructor() {}

  private async getJWT() {
    try{
      const user = await Auth.currentAuthenticatedUser();
      const { jwtToken } = user?.signInUserSession?.idToken;
      return jwtToken;
    } catch(e){
      // replace with retry logic + proper err handling
      return undefined;
    }
  }

  public static getInstance(): Service {
    if (!Service.instance) {
        Service.instance = new Service();
    }

    return Service.instance;
}

  public async getProjects() {
    try {
      const jwtToken = await this.getJWT();
      const data = {
        headers: { Authorization: "Bearer " + jwtToken },
      };
      const projectsURl = this.baseURL + "/projects/all";

      axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
      const res = await axios.get(projectsURl, data);
      const res_data = JSON.parse(res?.data?.body);
      
      if(res?.status != 200) throw Error("Response failed");

      return res_data;
    } catch (e) {
      //TODO replace with proper Error class
      console.log(e);
      return e;
    }
  }
}

const api = Service.getInstance();
export default api;
