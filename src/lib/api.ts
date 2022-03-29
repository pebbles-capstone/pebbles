import axios from 'axios';
import { Auth } from "aws-amplify";
import { PastProject, User } from '../types';
import { dtoFromUser, oldProjFromDto, ProjectDTO, UserDTO } from '../types/api';

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
      const res_data: ProjectDTO[] = JSON.parse(res?.data?.body);
      console.log(res_data);
      const proj: PastProject[] = res_data?.map(oldProjFromDto);
      
      if(res?.status != 200) throw Error("Response failed");

      return proj;
    } catch (e) {
      //TODO replace with proper Error class
      console.log(e);
      return e;
    }
  }

  public async getRecs(userID: Number) {
    try {
      const jwtToken = await this.getJWT();
      const data = {
        headers: { Authorization: "Bearer " + jwtToken },
      };
      const projectsURl = this.baseURL + `/recs/${userID}`;

      axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
      const res = await axios.get(projectsURl, data);
      console.log(res);
      const res_data = JSON.parse(res?.data?.body);
      
      if(res?.status != 200) throw Error("Response failed");

      return res_data?.recs;
    } catch (e) {
      //TODO replace with proper Error class
      console.log(e);
      return e;
    }
  }

  public async getUser(userID: Number) {
    try {
      const jwtToken = await this.getJWT();
      const data = {
        headers: { Authorization: "Bearer " + jwtToken },
      };
      const projectsURl = this.baseURL + `/user/${userID}`;

      axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
      const res = await axios.get(projectsURl, data);
      console.log(res);
      const res_data = JSON.parse(res?.data?.body);
      
      if(res?.status != 200) throw Error("Response failed");

      return res_data;
    } catch (e) {
      //TODO replace with proper Error class
      console.log(e);
      return e;
    }
  }

  public async postUser(userID: Number, user: User) {
    try {
      const jwtToken = await this.getJWT();
      const userData: UserDTO = dtoFromUser(user);
      const data = {
        headers: { Authorization: "Bearer " + jwtToken },
        body: {
          user: {
            ...userData
          }
        }
      };
      const projectsURl = this.baseURL + `/user/${userID}`;

      axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
      const res = await axios.post(projectsURl, data);
      console.log(res);
      const res_data = JSON.parse(res?.data?.body);
      
      if(res?.status != 200) throw Error("Response failed");

      return res_data?.recs;
    } catch (e) {
      //TODO replace with proper Error class
      console.log(e);
      return e;
    }
  }
}

const api = Service.getInstance();
export default api;
