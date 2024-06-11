import axios from "axios";
import { Laptop } from "../hooks/useData";

class laptopServices {
  http = axios.create({
    baseURL: "http://localhost:8080/api/",
  });

  async getLaptops() {
    const response = await this.http.get("/laptops");
    return response.data;
  }

  async editLaptops(id: string, laptop: Laptop): Promise<Laptop> {
    const response = await this.http.put(`/laptops/${id}`, laptop);
    return response.data;
  }
}

export default new laptopServices();
